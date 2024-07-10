"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
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
          {/* <div className="w-full">
            <input
              className="p-2 my-3 rounded-lg w-full"
              placeholder="Date de Naissance"
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div> */}

         <div className="w-full my-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full flex flex-row justify-start text-gray-400">
                <span className="flex flex-row justify-start">{birthdate ? birthdate.toLocaleDateString() : "Date de naissance"}</span>
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={birthdate}
                  onSelect={setBirthdate}
                  initialFocus
                  max={new Date()}  
                  enableYearDropdown  
                />
              </PopoverContent>
            </Popover>
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

          <Button className="w-full">Inscription</Button>

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