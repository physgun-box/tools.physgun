"use client";

import React, {createContext} from "react";
import {useAuth} from "@/hooks/auth.hook";

import Flex from "antd/lib/flex"
import Spin from "antd/lib/spin"

// import stylesheet from 'antd/lib/style/index.css';
// import style_badge from 'antd/lib/badge/style/index.css';

import {isServer} from "@/utils";
import {theme} from "antd/lib";
export const AuthContext = createContext({
    token: '',
    login: (jwtToken :string, userID :string) : any => {console.log(jwtToken,userID);},
    logout: () : any => {},
    userId: '',
    isAuthed: false,
})

export const AuthProvider = ({children}: { children: React.ReactNode } ) => {
    const {token,userId, ready, login, logout} = useAuth();
    const isAuthed = !!token;
    return (

        <AuthContext.Provider value={{token,userId,login,logout,isAuthed}}>
            <div className={"w-full h-full"} suppressHydrationWarning={true}>
                { (ready || isServer) ? children :
                    <Flex justify={"center"} align={"center"} style={{minHeight: "100%"}}>
                        <Spin size={"large"} spinning={true}/>
                    </Flex>
                }
            </div>
        </AuthContext.Provider>
    )
}