'use client';
import React from 'react';
import NavBar from '../../components/NavBar';
import Form from './form';

export default function CreateEvent() {
  return (
    <main className='relative flex flex-col items-center justify-center min-h-screen'>
      {/* Background image with opacity */}
      <div 
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/assets/bground.jpg')" }}
      ></div>
      
      <NavBar />
    
      <div className='relative flex items-center justify-center min-h-screen mx-2'>
        <Form />
      </div>
    </main>
  );
}
