import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch('/profile', {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const data = await res.json();
                console.log(data);
                if (res.status === 200) {
                    setUser(data); // Set user profile data
                } else {
                    nav('/login'); // Redirect to login if user profile not found
                }
            } catch (err) {
                console.log('Error: ', err);
                nav('/login'); // Redirect to login if error occurs
            }
        };

        fetchUserProfile();
    }, [nav]);

    return (
        <section className='profile'>
            <div className='container mt-5'>
                <div className='signup'>
                    <h1 className='text-center mb-4'>Profile</h1>
                    {user && (
                        <div>
                            <p><strong>Name:</strong> {user.Name}</p>
                            <p><strong>Profession:</strong> {user.Profession}</p>
                            <p><strong>Email:</strong> {user.Email}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Profile;
