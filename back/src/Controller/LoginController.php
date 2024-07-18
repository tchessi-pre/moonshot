<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
  #[Route('/api/login', name: 'app_login', methods: ['POST', 'OPTIONS'])]
  public function login(Request $request): Response
  {
    if ($request->isMethod('OPTIONS')) {
      return new Response('', 200, [
        'Access-Control-Allow-Origin' => 'http://localhost:3000',
        'Access-Control-Allow-Methods' => 'POST, OPTIONS',
        'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
      ]);
    }

    // Cette méthode peut rester vide, Symfony s'occupe de l'authentification
    return new JsonResponse(['message' => 'Login route'], JsonResponse::HTTP_OK, [
      'Access-Control-Allow-Origin' => 'http://localhost:3000',
    ]);
  }
}
