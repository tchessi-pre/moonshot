<?php

namespace App\Service;

use App\Entity\Event;
use App\Handler\EventSuccessHandler;
use App\Handler\EventFailureHandler;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;

class EventService
{
  private $entityManager;
  private $security;
  private $successHandler;
  private $failureHandler;

  public function __construct(EntityManagerInterface $entityManager, Security $security, EventSuccessHandler $successHandler, EventFailureHandler $failureHandler)
  {
    $this->entityManager = $entityManager;
    $this->security = $security;
    $this->successHandler = $successHandler;
    $this->failureHandler = $failureHandler;
  }

  public function createEvent(array $data)
  {
    $event = new Event();
    $event->setName($data['name']);
    $event->setDescription($data['description']);
    $event->setDate(new \DateTime($data['date']));
    $event->setTime(new \DateTime($data['time']));
    $event->setPlace($data['place']);
    $event->setPicture($data['picture'] ?? null);
    $event->setLink($data['link'] ?? null);

    $user = $this->security->getUser();
    if (!$user) {
      return $this->failureHandler->handle('User not authenticated');
    }

    $event->setCreator($user);
    $this->entityManager->persist($event);
    $this->entityManager->flush();

    return $this->successHandler->handle($event);
  }
}
