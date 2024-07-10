'use client';

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      className="p-2 text-gray-500 rounded-lg "
      placeholder="Date de naissance"
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly
      style={{ textAlign: 'left', width: '112%'}} // Ajouter width: '100%' pour s'assurer que l'input est à 100% de la largeur
    />
  ));

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/bground.jpg')" }}>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full max-w-md min-h-screen mx-2">
          <span className="text-xl font-bold text-white uppercase">Inscription</span>

          <div className="w-full">
            <input
              className="w-full p-2 my-3 rounded-lg"
              placeholder="Prénom"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <input
              className="w-full p-2 my-3 rounded-lg"
              placeholder="Nom"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <input
              className="w-full p-2 my-3 rounded-lg"
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full my-3 ">
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              placeholderText="Date de naissance"
              customInput={<CustomInput />}
              showYearDropdown
              dateFormat="dd/MM/yyyy"
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              maxDate={new Date()}
            />
          </div>

          <div className="w-full"> 
            <input
              className="w-full p-2 my-3 rounded-lg"
              placeholder="Mot de passe"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <input
              className="w-full p-2 my-3 rounded-lg"
              placeholder="Confirmer le mot de passe"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-full mt-6">Inscription</Button>

          <div className="my-2 text-white">
            <p>
              Vous avez un compte ?{" "}
              <a className="font-bold" href="/login">
                Se connecter
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}