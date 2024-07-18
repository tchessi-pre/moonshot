'use client';

import React from 'react';

const languageEvents = [
    {
        image: "/assets/langue1.jpg",
        title: "LANGUES DU MONDE",
        subtitle: "La beauté de la langue japonaise",
        buttonText: "En savoir plus"
    },
    {
        image: "/assets/langue2.jpg",
        title: "LANGUES DU MONDE",
        subtitle: "Les mystères du mandarin",
        buttonText: "En savoir plus"
    },
    {
        image: "/assets/langue3.jpg",
        title: "LANGUES DU MONDE",
        subtitle: "La richesse de l'espagnol",
        buttonText: "En savoir plus"
    },
    {
        image: "/assets/langue4.jpg",
        title: "LANGUES DU MONDE",
        subtitle: "L'élégance de l'italien",
        buttonText: "En savoir plus"
    }
];

const LanguagePage = () => {
    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/assets/bground.jpg")' }}>
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-8 font-roboto-condensed uppercase">DÉCOUVREZ LES LANGUES DU MONDE</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {languageEvents.map((event, index) => (
                        <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                            <img src={event.image} alt={event.title} className="w-full h-64 md:h-48 lg:h-64 object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-4 transform translate-y-full group-hover:translate-y-0 transition duration-300 ease-in-out">
                                <h2 className="text-xl md:text-2xl font-bold text-black">{event.title}</h2>
                                <p className="text-sm md:text-lg text-orange-600">{event.subtitle}</p>
                                <button className="text-blue-500 hover:underline mt-4">{event.buttonText}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LanguagePage;
