<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\GroupRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: GroupRepository::class)]
#[ORM\Table(name: '`group`')]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/groups',
            description: 'Retrieve the collection of groups',
            normalizationContext: ['groups' => ['group:read']]
        ),
        new Post(
            uriTemplate: '/groups',
            description: 'Create a new group',
            denormalizationContext: ['groups' => ['group:write']]
        ),
        new Get(
            uriTemplate: '/groups/{id}',
            description: 'Retrieve a specific group',
            normalizationContext: ['groups' => ['group:read']]
        ),
        new Put(
            uriTemplate: '/groups/{id}',
            description: 'Update an existing group',
            denormalizationContext: ['groups' => ['group:write']]
        ),
        new Delete(
            uriTemplate: '/groups/{id}',
            description: 'Delete a group'
        ),
    ],
    normalizationContext: ['groups' => ['group:read']],
    denormalizationContext: ['groups' => ['group:write']]
)]
class Group
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['group:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['group:read', 'group:write'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['group:read', 'group:write'])]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'groups')]
    #[Groups(['group:read', 'group:write'])]
    private ?User $creator = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): static
    {
        $this->creator = $creator;

        return $this;
    }
}
