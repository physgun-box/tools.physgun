"use client";
import React from "react";
import {usePathname, useRouter} from "next/navigation";
import BuildOutlined from "@ant-design/icons/BuildOutlined"
import DollarOutlined from "@ant-design/icons/DollarOutlined"
import HighlightOutlined from "@ant-design/icons/HighlightOutlined"
import ThunderboltOutlined from "@ant-design/icons/ThunderboltOutlined"
import ToolOutlined from "@ant-design/icons/ToolOutlined"
import {Menu, MenuProps} from "antd";
import {CodepenOutlined, WarningOutlined} from "@ant-design/icons";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

export function ASide() {

    const pathname = usePathname();
    const router = useRouter()
    const menuItems : MenuItem[] = [
        getItem('Основные генераторы', 'grp1', null, [
            getItem('Запускатор', '/generator/starter', <ThunderboltOutlined />),
            getItem('Конфигурация', '/generator/servercfg', <ToolOutlined />),
            // getItem('Workshop', '/generator/workshop', <BuildOutlined />),
        ], 'group'),
        getItem('Моделирование', 'grp5', null, [
            getItem('QC файл', '/generator/modeling/qc', <CodepenOutlined />),
        ], 'group'),
        // getItem('Другое', 'grp6', null, [
        //     getItem('Анализ Crash Dump', '/generator/other/crashdump', <WarningOutlined />),
        // ], 'group'),
        getItem('GM-Donate', 'grp4', null, [
            getItem('Донат продукт', '/generator/gmdonate/donate', <DollarOutlined />),
            getItem('Тема меню', '/generator/gmdonate/theme', <HighlightOutlined />),
        ], 'group')
    ];

    const onClickMenu: MenuProps['onClick'] = (e) => {
        router.push(e.key, { scroll: false })
    };

    return <Menu
            onClick={(e)=>onClickMenu(e)}
            style={{ width: "auto", backgroundColor: "transparent", border: 0 }}
            selectedKeys={[pathname]}
            defaultSelectedKeys={['1']}
            mode="inline"
            items={menuItems}
        />
}