<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use \Symfony\Component\Security\Core\User\UserInterface;
use Psr\Log\LoggerInterface;
use App\Entity\User;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
  private $jwtManager;
  private $logger;

  public function __construct(JWTTokenManagerInterface $jwtManager, LoggerInterface $logger)
  {
    $this->jwtManager = $jwtManager;
    $this->logger = $logger;
  }

  public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
  {
    $user = $token->getUser();

    if (!$user instanceof User) {
      $this->logger->error('Invalid user instance', ['user' => $user]);
      return new JsonResponse(['message' => 'Invalid user'], JsonResponse::HTTP_UNAUTHORIZED);
    }

    try {
      $jwt = $this->jwtManager->create($user);
      $this->logger->info('Generated JWT', ['token' => $jwt]);
    } catch (\Exception $e) {
      $this->logger->error('Failed to generate JWT', ['error' => $e->getMessage()]);
      return new JsonResponse(['message' => 'Failed to generate token'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
    }

    if (empty($jwt)) {
      $this->logger->error('JWT is empty', ['user' => $user]);
    } else {
      $this->logger->info('JWT is not empty', ['jwt' => $jwt]);
    }

    $data = [
      'message' => 'Login successful',
      'token' => $jwt,
      'user_id' => $user->getId(),
    ];

    return new JsonResponse($data, JsonResponse::HTTP_OK);
  }
}
