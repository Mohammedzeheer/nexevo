import React, { useState, useEffect } from 'react';
import { Axios } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import BackButton from './component/BackButton';


const UserData = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const Token = localStorage.getItem('user');
    const headers = { authorization: Token };
    const Navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('/profile', { headers });
                setUserData(response.data.user);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (

                userData && (
                    <div className="p-10">
                        <div className="p-8 bg-white shadow mt-24">
                            <div className="grid grid-cols-1">
                                <div className="relative">
                                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[110px] text-center pb-12">
                                <h1 className="text-4xl font-medium text-gray-700">{userData.username}</h1>
                                <p className="font-light text-gray-600 mt-3">{userData.email}</p>
                                <p className="font-light text-gray-600 mt-3">{userData.phonenumber}</p>
                            </div>

                            <div className=" text-center pb-12">
                                <button
                                    className=" text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                    onClick={() => Navigate('/profile/reset-password')}
                                >
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
            <BackButton />
        </>
    );
};

export default UserData;