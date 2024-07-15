'use client';
import React from 'react';
import ProfileForm from './form';

export default function ProfilePage() {
    return (
        <main
            className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
            style={{ backgroundImage: "url('/assets/bground.jpg')" }}
        >
            <div className='flex items-center justify-center min-h-screen mx-2'>
                <ProfileForm />
            </div>
        </main>
    );
}