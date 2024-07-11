<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

class LoginFailureHandler implements AuthenticationFailureHandlerInterface
{
  public function onAuthenticationFailure(Request $request, AuthenticationException $exception): JsonResponse
  {
    $data = [
      'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
    ];

    return new JsonResponse($data, JsonResponse::HTTP_UNAUTHORIZED);
  }
}
