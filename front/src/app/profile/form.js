'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/component/loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from '../../hooks/useFetch';

const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

const ProfileForm = () => {
    const [userData, setUserData] = useState(null);
    const [editing, setEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data, error: fetchError, loading, fetchData } = useFetch();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetchData(`http://127.0.0.1:8000/api/profile/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } else {
            setError('User ID not found');
        }
    }, [fetchData]);

    useEffect(() => {
        if (data && data.user) {
            setUserData(data.user);
            setFirstName(data.user.firstName || '');
            setLastName(data.user.lastName || '');
            setEmail(data.user.email || '');
            setBirthday(data.user.birthday ? new Date(data.user.birthday) : null);
        }
    }, [data]);


    useEffect(() => {
        if (fetchError) {
            setError(typeof fetchError === 'string' ? fetchError : 'An error occurred while fetching data');
        }
    }, [fetchError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setError('User ID not found');
            return;
        }

        try {
            const dataToSend = {
                firstName,
                lastName,
                email,
                birthday: birthday ? birthday.toISOString().split('T')[0] : null,
            };
            console.log('Data being sent:', JSON.stringify(dataToSend));

            const response = await fetchData(`http://127.0.0.1:8000/api/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include',
            });


            if (response && !response.error) {
                setSuccess('Profile updated successfully');
                setUserData(response.user);
                setEditing(false);
            } else {
                setError(response.error || 'Failed to update profile');
                console.error('Update error:', response.message);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError(typeof err === 'string' ? err : 'An error occurred while updating the profile');
        }
    };
    if (loading) return <Loader />;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!userData) return <div>No user data available</div>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center">Profil</h1>
                {!editing ? (
                    <>
                        <p><strong>Prénom:</strong> {userData.firstName}</p>
                        <p><strong>Nom:</strong> {userData.lastName}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Date de naissance:</strong> {formatDate(userData.birthday)}</p>
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
                            selected={birthday}
                            onChange={(date) => setBirthday(date)}
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

export default ProfileForm;