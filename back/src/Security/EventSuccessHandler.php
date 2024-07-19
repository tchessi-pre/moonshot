<?php

namespace App\Handler;

use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Event;

class EventSuccessHandler
{
  public function handle(Event $event): JsonResponse
  {
    return new JsonResponse([
      'message' => 'Event created successfully',
      'event' => [
        'id' => $event->getId(),
        'name' => $event->getName(),
        'description' => $event->getDescription(),
        'date' => $event->getDate()->format('Y-m-d'),
        'time' => $event->getTime()->format('H:i:s'),
        'place' => $event->getPlace(),
        'picture' => $event->getPicture(),
        'link' => $event->getLink(),
        'creator' => [
          'id' => $event->getCreator()->getId(),
          'email' => $event->getCreator()->getEmail(),
        ],
      ]
    ], JsonResponse::HTTP_CREATED);
  }
}
