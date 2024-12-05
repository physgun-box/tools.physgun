"use client";
import {ReactElement, useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "@/contexts/auth.context";
// @ts-ignore
import debounce from "lodash.debounce";
import {useRAPI} from "@/hooks/rapi.hook";

import {UserOutlined, LoginOutlined} from "@ant-design/icons";
import {Button, Flex, Spin} from "antd";

export default () : ReactElement => {
    const RAPI = useRAPI();
    const auth = useContext(AuthContext);
    const [userName,setUserName] = useState("Anonymous");

    const fetchUserInfo = useCallback(async ()=>{
        try {
            const data = await RAPI.request("/api/v1/auth/profile","GET", null,{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            });
            setUserName(data.user.username);
        } catch (e) {
            auth.logout();
        }
    },[auth,setUserName])

    const debouncedFetchUserInfo = useCallback(
        debounce(fetchUserInfo, 100),
        [fetchUserInfo]
    );

    useEffect(() => {
        debouncedFetchUserInfo()
    }, [debouncedFetchUserInfo]);

    if (!auth.isAuthed)
        return (
            <div className={"flex justify-center items-center"}>
                <Button href={"/cabinet/login"} className={"opacity-60 hover:opacity-100"} type="dashed" icon={<LoginOutlined />} size={"large"}>Войти</Button>
            </div>
        )


    if (RAPI.loading || userName === "Anonymous")
        return <Flex justify={"center"} align={"center"} style={{minHeight: "100%"}}>
            <Spin size={"small"} spinning={true}/>
        </Flex>
    return (
        <div className={"flex justify-center items-center"}>
            <Button className={"opacity-60 hover:opacity-100"} type="text" icon={<UserOutlined/>} size={"large"}>{userName}</Button>
        </div>
    )
}