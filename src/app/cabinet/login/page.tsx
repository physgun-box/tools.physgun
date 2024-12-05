"use client";
import {useContext} from "react";
import Button from "antd/lib/button";
import Form from "antd/lib/form";
import message from "antd/lib/message";
import logo from "@/assets/logo.svg";
import {useRAPI} from "@/hooks/rapi.hook";
import {AuthContext} from "@/contexts/auth.context";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Input} from "antd";

type IFields = {
    username?: number;
    password?: number;
};
export default function Home() {
    const RAPI = useRAPI();
    const auth = useContext(AuthContext);
    const router = useRouter()

    const loginHandler = async (form:any) => {
        try {
            const data = await RAPI.request('/api/v1/auth/login', 'POST', {...form})
            auth.login(data.access_token,data.user.uuid);
            router.push("/", { scroll: false })
        } catch (e:any) {
            message.error("Неверный логин или пароль");
        }
    }

    return (
        <Form
            name="auth"
            initialValues={{ remember: true }}
            className="w-[300px]"
            autoComplete="off"
            onFinish={loginHandler}
            layout="vertical"
        >
            <div className="flex flex-row justify-center mb-8">
                <a href="/"><Image src={logo} alt={"Logo"} width={140} height={40} /></a>
            </div>

            <Form.Item<IFields>
                name="username"
                className={"flex-1"}
                rules={[{ required: true, message: 'Пожалуйста введите логин' }]}
            >
                <Input size={"large"} style={{width: "100%"}} placeholder={"Логин"} />
            </Form.Item>
            <Form.Item<IFields>
                name="password"
                className={"flex-1"}
                rules={[{ required: true, message: 'Пожалуйста введите пароль' }]}
            >
                <Input.Password size={"large"} style={{width: "100%"}} placeholder={"Пароль"} />
            </Form.Item>

            <div className="flex flex-row justify-center">
                <Form.Item className={"m-0 p-0"}>
                    <Button loading={RAPI.loading} type="primary" size={"large"} htmlType="submit" className={"bg-blue-600"}>
                        Авторизация
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}
