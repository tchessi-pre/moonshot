'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import useRegistrationStore from '@/stores/registrationStore';
import ConfirmDialog from './ConfirmDialog';
import { useRouter } from 'next/navigation';

const getFullImageUrl = (url) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
    return url ? `${BASE_URL}${url}` : '/assets/event-placeholder.png';
};

const EventModal = ({ isOpen, onClose, eventId, userId }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
    const createRegistration = useRegistrationStore(
        (state) => state.createRegistration
    );
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            const fetchEvent = async () => {
                try {
                    const response = await axiosInstance.get(
                        `/events/${eventId}?populate=*`
                    );
                    setEvent(response.data.data.attributes);
                } catch (error) {
                    console.error(
                        "Erreur lors de la récupération des détails de l'événement",
                        error
                    );
                } finally {
                    setLoading(false);
                }
            };
            fetchEvent();
        }
    }, [eventId, isOpen]);

    const handleRegistration = async () => {
        try {
            const registration = await createRegistration(userId, eventId);
            console.log('Inscription réussie:', registration);
            toast.success('Inscription réussie!');
            setConfirmDialogIsOpen(false);
            onClose();
            // Rediriger vers la page de confirmation avec le numéro de confirmation
            router.push(`/confirmation?eventName=${event.name}&confirmationNumber=${registration.attributes.confirmationNumber}`);
        } catch (error) {
            console.error("Erreur lors de l'inscription à l'événement:", error);
            toast.error("Erreur lors de l'inscription à l'événement.");
        }
    };

    const {
        name = "Nom de l'événement",
        category = 'Catégorie',
        description = "Description de l'événement",
        date = new Date(),
        participant = 0,
        price = 0,
        link = '#',
        picture = null,
        address = 'Adresse non disponible',
        isVerified = false,
    } = event || {};

    const imageUrl = picture?.data?.attributes?.url
        ? getFullImageUrl(picture.data.attributes.url)
        : '/assets/event-placeholder.png';

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className='max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-lg'>
                    <div className='flex flex-col sm:flex-row'>
                        <div className='flex-shrink-0 w-full sm:w-2/5'>
                            <img
                                src={imageUrl}
                                alt={name}
                                className='object-cover w-full h-full rounded-lg'
                            />
                        </div>
                        <Card className='flex-1 p-5 sm:w-3/5'>
                            <CardHeader className='p-6 bg-gray-50'>
                                <CardTitle className='flex items-center justify-between mb-2 text-xl font-semibold text-gray-700'>
                                    {name}
                                    {isVerified && (
                                        <span className='flex items-center ml-2 text-green-500'>
                                            <FontAwesomeIcon icon={faCheckCircle} className='mr-1' />
                                            Vérifié
                                        </span>
                                    )}
                                </CardTitle>
                                <div className='flex justify-between'>
                                    <CardDescription className='text-yellow-800'>
                                        {category}
                                    </CardDescription>
                                    <CardDescription className='text-yellow-800'>
                                        {new Date(date).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className='p-6 overflow-y-scroll max-h-60'>
                                <p className='text-gray-700'>{description}</p>
                                <p className='text-gray-700'>
                                    Nombre de participants: {participant}
                                </p>
                                <p className='text-gray-700'>Adresse: {address}</p>
                                <p className='font-bold text-gray-700'>
                                    Prix: {price === 0 ? 'Gratuit' : `${price} €`}
                                </p>
                            </CardContent>
                            <CardFooter className='px-6 py-4 bg-gray-50'>
                                <a
                                    href={link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-blue-500 underline hover:text-blue-700'
                                >
                                    Plus d'infos
                                </a>
                                <Button
                                    className='ml-4'
                                    onClick={() => setConfirmDialogIsOpen(true)}
                                >
                                    S'inscrire
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                isOpen={confirmDialogIsOpen}
                onClose={() => setConfirmDialogIsOpen(false)}
                onConfirm={handleRegistration}
                eventName={name}
            />
        </>
    );
};

export default EventModal;
