<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ProfileController extends AbstractController
{
    #[Route('api/profile/{id}', name: 'app_profile')]
    public function getProfile(User $user): JsonResponse
    {
        return $this->json([
            'user' => $user
        ]);
    }

    #[Route('/api/profile/{id}', name: 'app_update_profile')]
    public function updateProfile(User $user, UserRepository $userRepository, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        return $this->json([
            'user' => $user,
        ]);
    }
}
