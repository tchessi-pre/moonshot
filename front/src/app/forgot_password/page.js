'use client'; 
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour gérer la récupération du mot de passe
        console.log("Email pour récupération de mot de passe : ", email);
    };

    return (
        <div className="flex flex-col min-h-screen bg-center bg-cover" style={{ backgroundImage: 'url("/assets/bground.jpg")' }}>
            <div className="container flex items-center justify-center flex-grow py-8 mx-auto">
                <div className="w-full max-w-md p-8 mx-4">
                    <h2 className="mb-6 text-2xl font-bold text-center text-white">RÉINITIALISATION DE MON MOT DE PASSE</h2>
                    <p className="mb-6 text-center text-white">
                        Si vous avez oublié votre mot de passe, merci de renseigner votre adresse email afin que nous puissions réinitialiser votre mot de passe
                    </p>
                    <form onSubmit={handleSubmit} className="bg-transparent">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full p-2 mt-1 text-white placeholder-gray-300 bg-transparent border border-gray-300 rounded-md"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 text-white bg-black rounded hover:bg-gray-800"
                        >
                            Envoyer lien de réinitialisation
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
