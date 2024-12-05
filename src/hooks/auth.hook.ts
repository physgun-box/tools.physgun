"use client";
import {useCallback, useEffect, useState} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token,setToken] = useState("");
    const [userId,setUserId] = useState("");
    const [ready,setReady] = useState(false);


    const login = useCallback((jwtToken:string,uid:string)=>{
        setToken(jwtToken);
        setUserId(uid);

        localStorage.setItem(storageName, JSON.stringify({
            userId: uid, token: jwtToken
        }));
    },[])

    const logout = useCallback(()=>{
        setToken("");
        setUserId("");

        localStorage.removeItem(storageName)
    },[])

    useEffect(()=>{
        const fromStorage : any = localStorage.getItem(storageName)
        const data = JSON.parse(fromStorage);

        if (data && data.token) {
            login(data.token,data.userId)
        }

        setReady(true);

    },[login])

    const isAuthed = false;

    return { login, logout, token, userId, ready, isAuthed}
}