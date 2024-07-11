// src/app/events/page.js

'use client'; // Assurez-vous que ce composant est rendu côté client
import NavBar from '../../components/NavBar';
import EventCard from '../../components/EventCard';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Events = () => {
    const upcomingEvents = [
        {
            image: "/assets/event1.png",
            subtitle: "Événements",
            title: "Événements du Mois",
            description: "Rencontre culinaire - Brazil",
            buttonText: "S'inscrire à cet événement"
        },
        {
            image: "/assets/event1.png",
            subtitle: "Événements",
            title: "Événements du Mois",
            description: "Rencontre culinaire - Brazil",
            buttonText: "S'inscrire à cet événement"
        },
        {
            image: "/assets/event1.png",
            subtitle: "Événements",
            title: "Événements du Mois",
            description: "Rencontre culinaire - Brazil",
            buttonText: "S'inscrire à cet événement"
        }
    ];

    const pastEvents = [
        {
            image: "/assets/event1.png",
            subtitle: "Événements",
            title: "Événements du Mois",
            description: "Rencontre culinaire - Brazil",
            buttonText: "Lire"
        },
        {
            image: "/assets/event1.png",
            subtitle: "Événements",
            title: "Événements du Mois",
            description: "Rencontre culinaire - Brazil",
            buttonText: "Lire"
        },
        {
            image: "/assets/event1.png",
            subtitle: "Événements",
            title: "Événements du Mois",
            description: "Rencontre culinaire - Brazil",
            buttonText: "Lire"
        }
    ];

    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/assets/bground.jpg")' }}>
            <NavBar />
            <div className="container mx-auto py-8">
                <h2 className="text-2xl font-bold mb-6 text-white" style={{marginTop:"50px"}}>Événements à Venir</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {upcomingEvents.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard {...event} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <h2 className="text-2xl font-bold mt-12 mb-6 text-white">Événements Passés</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {pastEvents.map((event, index) => (
                        <SwiperSlide key={index}>
                            <EventCard {...event} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Events;
