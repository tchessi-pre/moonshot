"use client";

import React from "react";
import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


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
        className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
        style={{ backgroundImage: "url('/assets/bground.jpg')" }}
    >
        <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md flex items-center justify-center min-h-screen mx-2">
            <span className='text-white uppercase font-bold text-xl'>Inscription</span>

                <div>
                    <input className='p-2 my-3 rounded-lg'
                        placeholder="Prénom"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input className='p-2 my-3 rounded-lg'
                        placeholder="Nom"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input className='p-2 my-3 rounded-lg'
                        placeholder = "Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="fw-[32rem]">
                    <input className='text-neutral-400 w-max p-2 my-3 rounded-lg'
                        placeholder = "Date de Naissance"
                        type=""
                        id="birthdate"
                        value={birthdate}
                        //onChange={(e) => setBirthdate(e.target.value)}
                        required
                    />
                </div>

                <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <CalendarIcon className="mr-2 h-4 w-4" />
         <span>Date de naissance</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
        //   selected={date}
        //   onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>

                <div>
                    <input className='p-2 my-3 rounded-lg'
                        placeholder="Mot de passe"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input className='p-2 my-3 rounded-lg'
                        placeholder = "Confirmer le mot de passe"
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

				<Button>Inscription</Button>

                <div className="text-white my-2">
                    <p>Vous avez un compte ? <a className ="font-bold" href="/login">Se connecter</a></p>
            </div>
            </form>


        </div>
        </main>
    );
}