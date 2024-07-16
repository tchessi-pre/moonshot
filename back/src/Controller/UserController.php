<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Handler\UserHandler;

class UserController extends AbstractController
{
  private $userHandler;

  public function __construct(UserHandler $userHandler)
  {
    $this->userHandler = $userHandler;
  }

  #[Route('/api/user', name: 'get_current_user', methods: ['GET'])]
  public function getCurrentUser(): JsonResponse
  {
    $user = $this->userHandler->getCurrentUser();

    if (!$user) {
      return new JsonResponse(['message' => 'User not found or not authenticated'], JsonResponse::HTTP_UNAUTHORIZED);
    }

    $userData = [
      'id' => $user->getId(),
      'email' => $user->getEmail(),
      'firstName' => $user->getFirstName(),
      'lastName' => $user->getLastName(),
      'birthday' => $user->getBirthday() ? $user->getBirthday()->format('Y-m-d') : null,
      // Ajoutez d'autres champs si nécessaire
    ];

    return new JsonResponse($userData, JsonResponse::HTTP_OK, [
      'Access-Control-Allow-Origin' => 'https://localhost:3000',
    ]);
  }

  #[Route('/api/user', name: 'update_current_user', methods: ['PUT'])]
  public function updateCurrentUser(Request $request): JsonResponse
  {
    $data = json_decode($request->getContent(), true);

    return $this->userHandler->updateCurrentUser($data);
  }
}
