"use client";
import {Button} from "antd";
import LinkOutlined from "@ant-design/icons/LinkOutlined";

export function Links() {
    return <>
        <Button type={"text"} href={"https://discord.gg/ZP3p2WH7wb"} target={"_blank"} icon={<LinkOutlined />} size={"large"}>Discord</Button>
        <Button href={"https://vk.com/physgun_ru"} target={"_blank"} type={"text"} icon={<LinkOutlined />} size={"large"}>Вконтакте</Button>
        <Button href={"https://t.me/physgun"} target={"_blank"} type={"text"} icon={<LinkOutlined />} size={"large"}>Telegram</Button>
    </>
}