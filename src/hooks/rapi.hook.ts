"use client";
import {useCallback, useState} from "react";

export const useRAPI = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<any>()

    const request = useCallback(async (
                                       url:string,
                                       method:string = "GET",
                                       body:object|null|string = null,
                                       headers:HeadersInit = {"Content-Type": "application/json"}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
            }

            const response = await fetch("https://api.physgun.ru"+url,{ method, body, headers, next: {revalidate: 3600*24} });
            const data = await response.json();

            if (!response.ok) {
                throw data || 'Что-то пошло не так';
            }
            setLoading(false);

            return data;

        } catch (e) {
            setLoading(false);
            setError(e);
            throw e;
        }


    },[])

    return {request, loading, error};
}