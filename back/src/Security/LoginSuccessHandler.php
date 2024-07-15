<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;

class LoginSuccessHandler implements AuthenticationSuccessHandlerInterface
{
    public function onAuthenticationSuccess(Request $request, TokenInterface $token): JsonResponse
    {
        $user = $token->getUser();
        if (!$user instanceof User) {
            return new JsonResponse(['error' => 'Unexpected user type'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        $data = [
            'message' => 'Login successful',
            'userId' => $user->getId(),
        ];

        return new JsonResponse($data, JsonResponse::HTTP_OK);
    }
}