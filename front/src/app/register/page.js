"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/assets/bground.jpg')" }}
    >
      <div className="flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md items-center justify-center min-h-screen mx-2"
        >
          <span className="text-white uppercase font-bold text-xl">Inscription</span>

          <div className="w-full">
            <input
              className="p-2 my-3 rounded-lg w-full"
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
              className="p-2 my-3 rounded-lg w-full"
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
              className="p-2 my-3 rounded-lg w-full"
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full my-3">
            <DatePicker
              selected={birthdate}
              onChange={(date) => setBirthdate(date)}
              placeholderText="Date de naissance"
              className="p-2 rounded-lg w-full"
              showYearDropdown
              dateFormat="dd/MM/yyyy"
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              maxDate={new Date()}
            />
          </div>

          <div className="w-full">
            <input
              className="p-2 my-3 rounded-lg w-full"
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
              className="p-2 my-3 rounded-lg w-full"
              placeholder="Confirmer le mot de passe"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button className="w-full mt-6">Inscription</Button>

          <div className="text-white my-2">
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
