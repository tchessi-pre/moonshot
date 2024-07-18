<?php

namespace App\Handler;

use Symfony\Component\HttpFoundation\JsonResponse;

class EventFailureHandler
{
  public function handle(string $message): JsonResponse
  {
    return new JsonResponse(['message' => $message], JsonResponse::HTTP_UNAUTHORIZED);
  }
}
