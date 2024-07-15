<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ProfileController extends AbstractController
{
    #[Route('/api/profile/{id}', name: 'app_profile', methods: ['GET'])]
    public function getProfile(User $user): JsonResponse
    {

        return $this->json([
            'user' => [
                'id' => $user->getId(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'email' => $user->getEmail(),
                'birthday' => $user->getBirthday(),
            ]
        ]);
    }

    #[Route('/api/profile/{id}', name: 'app_update_profile', methods: ['PUT'])]
    public function updateProfile(User $user, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (isset($data['firstName'])) $user->setFirstName($data['firstName']);
            if (isset($data['lastName'])) $user->setLastName($data['lastName']);
            if (isset($data['email'])) $user->setEmail($data['email']);
            if (isset($data['birthday'])) {
                $birthday = new \DateTime($data['birthday']);
                $user->setBirthday($birthday);
            }

            $entityManager->flush();

            return $this->json([
                'message' => 'Profile updated successfully',
                'user' => [
                    'id' => $user->getId(),
                    'firstName' => $user->getFirstName(),
                    'lastName' => $user->getLastName(),
                    'email' => $user->getEmail(),
                    'birthday' => $user->getBirthday() ? $user->getBirthday()->format('Y-m-d') : null,
                ]
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Failed to update profile',
                'message' => $e->getMessage()
            ], 400);
        }
    }
}