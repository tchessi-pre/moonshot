<?php

namespace App\Handler;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\User;
use App\Repository\UserRepository;

class UserHandler
{
  private $entityManager;
  private $security;
  private $userRepository;

  public function __construct(EntityManagerInterface $entityManager, Security $security, UserRepository $userRepository)
  {
    $this->entityManager = $entityManager;
    $this->security = $security;
    $this->userRepository = $userRepository;
  }

  public function getCurrentUser(): ?User
  {
    $user = $this->security->getUser();

    if (!$user instanceof UserInterface) {
      return null;
    }

    return $user;
  }

  public function updateCurrentUser(array $data): JsonResponse
  {
    $user = $this->getCurrentUser();

    if (!$user instanceof UserInterface) {
      return new JsonResponse(['message' => 'User not found or not authenticated'], JsonResponse::HTTP_UNAUTHORIZED);
    }

    if (isset($data['email']) && $data['email'] !== $user->getEmail()) {
      $existingUser = $this->userRepository->findOneBy(['email' => $data['email']]);
      if ($existingUser) {
        return new JsonResponse(['message' => 'Email already exists'], JsonResponse::HTTP_BAD_REQUEST);
      }
      $user->setEmail($data['email']);
    }

    if (isset($data['firstName'])) {
      $user->setFirstName($data['firstName']);
    }

    if (isset($data['lastName'])) {
      $user->setLastName($data['lastName']);
    }

    if (isset($data['birthday'])) {
      try {
        $birthday = new \DateTime($data['birthday']);
        $user->setBirthday($birthday);
      } catch (\Exception $e) {
        return new JsonResponse(['message' => 'Invalid date format for birthday'], JsonResponse::HTTP_BAD_REQUEST);
      }
    }

    $this->entityManager->persist($user);
    $this->entityManager->flush();

    return new JsonResponse(['message' => 'User updated successfully'], JsonResponse::HTTP_OK, [
      'Access-Control-Allow-Origin' => 'https://localhost:3000',
    ]);
  }
}
