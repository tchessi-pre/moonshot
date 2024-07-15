<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class LoginController extends AbstractController
{
    #[Route('/api/login', name: 'app_login', methods: ['POST', 'OPTIONS'])]
    public function login(Request $request, User $user): Response
    {
        if ($request->isMethod('OPTIONS')) {
            return new Response('', 200, [
                'Access-Control-Allow-Origin' => 'https://localhost:3000',
                'Access-Control-Allow-Methods' => 'POST, OPTIONS',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
            ]);
        }

        return new JsonResponse([
            'userId' => $user->getId(),
            'message' => 'Login successful',
        ], JsonResponse::HTTP_OK, [
            'Access-Control-Allow-Origin' => 'https://localhost:3000',
        ]);
    }
}