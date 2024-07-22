'use client';
import React from 'react';
import './style.css';
import Form from './Form';
import NavBarLogin from '@/components/NavBarLogin'; 

export default function Login() { 
    return (
        <main
            className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
            style={{ backgroundImage: "url('/assets/bground.jpg')" }}
        >
            <NavBarLogin />
            <div className='flex items-center justify-center min-h-screen mx-2'>
                <Form />
            </div>
        </main>
    );
}

