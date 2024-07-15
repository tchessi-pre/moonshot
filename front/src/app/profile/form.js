'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/component/loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from '../../hooks/useFetch';

const Profile = () => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data, error: fetchError, loading, fetchData } = useFetch();

    useEffect(() => {
        fetchData('http://127.0.0.1:8000/api/profile/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }, []);

    useEffect(() => {
        if (data) {
            setUserData(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmail(data.email);
            setBirthdate(data.birthdate ? new Date(data.birthdate) : null);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetchData('http://127.0.0.1:8000/api/profile/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                firstName,
                lastName,
                email,
                birthdate: birthdate ? birthdate.toISOString().split('T')[0] : null,
            },
            withCredentials: true,
        });
        setEditing(false);
    };

    if (loading) return <Loader />;
    if (fetchError) return <div>Error: {fetchError}</div>;
    if (!userData) return <div>No user data</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Profil</h1>
                {!editing ? (
                    <>
                        <p><strong>Prénom:</strong> {userData.firstName}</p>
                        <p><strong>Nom:</strong> {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Date de naissance:</strong> {userData.birthdate}</p>
                        <Button onClick={() => setEditing(true)}>Modifier</Button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            className="w-full p-2 border rounded"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Prénom"
                        />
                        <input
                            className="w-full p-2 border rounded"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Nom"
                        />
                        <input
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <DatePicker
                            selected={birthdate}
                            onChange={(date) => setBirthdate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="w-full p-2 border rounded"
                        />
                        <Button type="submit">Sauvegarder</Button>
                        <Button onClick={() => setEditing(false)} variant="outline">Annuler</Button>
                    </form>
                )}
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-500">{success}</div>}
            </div>
        </div>
    );
};

export default Profile;