<?php

namespace App\Controller;

use App\Entity\Event;
use App\Service\EventService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class EventController extends AbstractController
{
  private $eventService;
  private $entityManager;

  public function __construct(EventService $eventService, EntityManagerInterface $entityManager)
  {
    $this->eventService = $eventService;
    $this->entityManager = $entityManager;
  }

  #[Route('/api/event/create', name: 'create_event', methods: ['POST'])]
  public function create(Request $request): JsonResponse
  {
    $data = json_decode($request->getContent(), true);
    return $this->eventService->createEvent($data);
  }

  #[Route('/api/event/{id}', name: 'get_event', methods: ['GET'])]
  public function getEvent(int $id): JsonResponse
  {
    $event = $this->entityManager->getRepository(Event::class)->find($id);

    if (!$event) {
      return new JsonResponse(['message' => 'Event not found'], JsonResponse::HTTP_NOT_FOUND);
    }

    return new JsonResponse([
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
    ], JsonResponse::HTTP_OK);
  }

  #[Route('/api/events', name: 'get_all_events', methods: ['GET'])]
  public function getAllEvents(): JsonResponse
  {
    $events = $this->entityManager->getRepository(Event::class)->findAll();
    $eventData = [];

    foreach ($events as $event) {
      $eventData[] = [
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
      ];
    }

    return new JsonResponse($eventData, JsonResponse::HTTP_OK);
  }
}
