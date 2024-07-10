"use client";

import React from "react";
import { useState } from 'react';
import Image from "next/image";
import axios from "axios";

export default function Register() {
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/register", {
                firstName,
                lastName,
                email,
                birthday,
                password
            });
            if (response.status === 201) {
                console.log('Utilisateur créé avec succès');
                // Rediriger ou afficher un message de succès
            }
        } catch (error) {
            console.error('Échec de l\'inscription', error.response?.data?.message || error.message);
            // Afficher un message d'erreur à l'utilisateur
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div>
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Nom</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="birthday">Date de naissance</label>
                    <input
                        type="date"
                        id="birthdate"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <p>Vous avez un compte ? <a href="/login">Se connecter</a></p>
                </div>
                <button type="submit">Inscription</button>
            </form>
        </div>
    );
}