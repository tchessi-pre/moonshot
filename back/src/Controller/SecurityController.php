<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
  #[Route('/api/register', name: 'api_register', methods: ['POST'])]
  public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
  {
    $data = json_decode($request->getContent(), true);

    if (!$data || !isset($data['email']) || !isset($data['password']) || !isset($data['firstName']) || !isset($data['lastName'])) {
      return new JsonResponse(['error' => 'Invalid data'], Response::HTTP_BAD_REQUEST);
    }

    $user = new User();
    $user->setEmail($data['email']);
    $user->setFirstName($data['firstName']);
    $user->setLastName($data['lastName']);
    $user->setPassword(
      $passwordHasher->hashPassword(
        $user,
        $data['password']
      )
    );

    $entityManager->persist($user);
    $entityManager->flush();

    return new JsonResponse(['status' => 'User created!'], Response::HTTP_CREATED);
  }
}
