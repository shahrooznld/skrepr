<?php

namespace App\Controller;

use App\Entity\PhoneBook;
use App\Form\PhoneBookType;
use App\Repository\PhoneBookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class PhoneBookController extends AbstractController
{

    /**
     * @Route("/phone_book", name="post_phone_book", methods={"POST"})
     */
    public function save(Request $request, EntityManagerInterface $em): Response
    {
        $params = $request->toArray();
        $phoneBookEntity = new PhoneBook();
        $form = $this->createForm(PhoneBookType::class, $phoneBookEntity);
        $form->submit($params);
        if ($form->isValid()) {
            $em->persist($phoneBookEntity);
            $em->flush();
            return $this->json($phoneBookEntity);
        }
        return $this->json([ 'message' => 'Your request is not valid!'], Response::HTTP_BAD_REQUEST );
    }
    /**
     * @Route("/phone_book/{id}", name="get_phone_book", methods={"GET"})
     */
    public function show($id, PhoneBookRepository $phoneBookRepository, SerializerInterface $serializer): Response
    {
        $phoneBook = $phoneBookRepository->find($id);
        return $this->json($phoneBook,Response::HTTP_OK, [],['groups' => ["phone_book_summary"]]);
    }

}
