<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse; // Import JsonResponse
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserRepository $userRepository, UserPasswordHasherInterface $userPasswordHasherInterface, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $user = new User();

        $user->setEmail($data['email']);
        $hashedPassword = $userPasswordHasherInterface->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setBirthday(new \DateTime($data['birthday']));
        $user->setProfilePicture($data['profilePicture']);
        $user->setBio($data['bio']);
        $user->setHobbies($data['hobbies']);
        $user->setLanguages($data['languages']);
        $user->setCity($data['city']);
        $user->setRoles(['ROLE_USER']);
        $user->setCreatedAt(new \DateTimeImmutable());

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['message' => 'User created!'], JsonResponse::HTTP_CREATED);
    }
}
    