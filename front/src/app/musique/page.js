'use client';
import NavBar from '../../components/NavBar';
import React from 'react';

const musicEvents = [
    {
        image: "/assets/musique1.png",
        title: "MUSIQUE DU MONDE",
        subtitle: "Les classiques du metal japonais",
        buttonText: "Écouter"
    },
    {
        image: "/assets/musique2.png",
        title: "MUSIQUE DU MONDE",
        subtitle: "Aux origines du rap Mexicain",
        buttonText: "Écouter"
    },
    {
        image: "/assets/musique3.png",
        title: "MUSIQUE DU MONDE",
        subtitle: "La musique Funk Africaine",
        buttonText: "Écouter"
    }
];

const MusicPage = () => {
    return (
        <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url("/assets/bground.jpg")' }}>
            			<NavBar />
            <div className="container mx-auto py-8 px-4">
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white text-center mb-8 font-roboto-condensed uppercase" style={{marginTop:"49px"}}>ÉCOUTEZ LE MONDE CHANTER</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {musicEvents.map((event, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg shadow-md group">
                            <img src={event.image} alt={event.title} className="object-cover w-full h-64 md:h-48 lg:h-64" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 transition duration-300 ease-in-out transform translate-y-full bg-white bg-opacity-80 group-hover:translate-y-0">
                                <h2 className="text-xl font-bold text-black md:text-2xl">{event.title}</h2>
                                <p className="text-sm text-orange-600 md:text-lg">{event.subtitle}</p>
                                <button className="mt-4 text-blue-500 hover:underline">{event.buttonText}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MusicPage;
