<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST', 'OPTIONS'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasherInterface, EntityManagerInterface $entityManager): Response
    {
        if ($request->isMethod('OPTIONS')) {
            return new Response('', 200, [
                'Access-Control-Allow-Origin' => 'https://localhost:3000',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
            ]);
        }

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST, [
                'Access-Control-Allow-Origin' => 'https://localhost:3000',
            ]);
        }

        try {
            $user = new User();
            $user->setEmail($data['email']);
            $hashedPassword = $userPasswordHasherInterface->hashPassword($user, $data['password']);
            $user->setPassword($hashedPassword);
            $user->setFirstName($data['firstName']);
            $user->setLastName($data['lastName']);
            $user->setBirthday(new \DateTime($data['birthdate']));
            $user->setRoles(['ROLE_USER']);
            $user->setCreatedAt(new \DateTimeImmutable());

            // Optionnels : vérifiez si ces champs existent dans $data avant de les définir
            $user->setProfilePicture($data['profilePicture'] ?? null);
            $user->setBio($data['bio'] ?? null);
            $user->setHobbies($data['hobbies'] ?? []);
            $user->setLanguages($data['languages'] ?? []);
            $user->setCity($data['city'] ?? 'Unknown');

            $entityManager->persist($user);
            $entityManager->flush();

            return new JsonResponse(['message' => 'User created!'], JsonResponse::HTTP_CREATED, [
                'Access-Control-Allow-Origin' => 'https://localhost:3000'
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An error occurred while creating the user'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR, [
                'Access-Control-Allow-Origin' => 'https://localhost:3000'
            ]);
        }
    }
}
