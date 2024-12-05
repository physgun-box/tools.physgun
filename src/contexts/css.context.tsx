'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import {theme} from "antd/lib";
import {ConfigProvider} from "antd";

import { useState, type PropsWithChildren } from 'react'

export const AntdProvider = ({ children }: PropsWithChildren) => {
    const [cache] = useState(() => createCache())

    useServerInsertedHTML(() => {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `</script>${extractStyle(cache)}<script>`,
                }}
            />
        )
    })

    return <StyleProvider cache={cache}>{children}</StyleProvider>
}

const AntdStyleProvider = ({children}:React.PropsWithChildren) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#2788f8",
                    colorInfo: "#3d6df8"
                },
                components: {
                    Button: {
                        paddingInline: 3,
                        "controlHeight": 29
                    }
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <AntdProvider>{children}</AntdProvider>
        </ConfigProvider>
    )
}

export default AntdStyleProvider;