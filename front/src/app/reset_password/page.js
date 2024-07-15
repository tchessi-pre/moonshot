// src/app/reset_password/page.js

'use client'; // Assurez-vous que ce composant est rendu côté client
import NavBar from '../../components/NavBar';
import React, { useState } from 'react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour gérer la réinitialisation du mot de passe
        console.log("Nouveau mot de passe : ", password);
        console.log("Confirmation du mot de passe : ", confirmPassword);
    };

    return (
        <div className="bg-cover bg-center min-h-screen flex flex-col" style={{ backgroundImage: 'url("/assets/bground.jpg")' }}>
            <div className="container mx-auto py-8 flex-grow flex justify-center items-center">
                <div className="p-8 w-full max-w-md mx-4">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white">INITIALISER VOTRE MOT DE PASSE</h2>
                    <form onSubmit={handleSubmit} className="bg-transparent">
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-white">Votre nouveau mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white text-white placeholder-black"
                                placeholder="Votre nouveau mot de passe"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirmer votre mot de passe</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md bg-white text-white placeholder-black"
                                placeholder="Confirmer votre mot de passe"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                        >
                            Confirmer mon nouveau mot de passe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
