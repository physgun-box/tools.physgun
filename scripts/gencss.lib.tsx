import fs from 'fs';
import React from 'react';
import { extractStyle } from '@ant-design/static-style-extract';
import { ConfigProvider } from 'antd';
import {theme} from "antd/lib";
import {HappyProvider} from "@ant-design/happy-work-theme";

const outputPath = './public/physgun.min.css';

const css = extractStyle((node) => (
    <>
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
            <HappyProvider>
            {node}
            </HappyProvider>
        </ConfigProvider>
    </>
));

fs.writeFileSync(outputPath, css);