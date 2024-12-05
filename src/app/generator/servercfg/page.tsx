import FormComponent from "@/app/generator/servercfg/form.component";
import Image from "next/image";
import hero from "@/assets/heros/servercfg.png";
import {Alert, Divider} from "antd";
import React from "react";
import {Metadata} from "next";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
    metadataBase: new URL('https://physgun.ru'),
    
    title: 'Создать файл конфигурации сервера Garry\'s Mod | Physgun',
    description: 'При помощи данного инструмента вы сможете быстро создать файл для настройки и запуска сервера Garry\'s Mod.',
    keywords: 'gmod, garry\'s, mod, гмод, гарис, мод, генератор, генераторы, создание, упрощение, без, кода, код, start.bat, server.cfg, как запустить сервер, сервер, создать',
    creator: 'Physgun communication',
    publisher: 'Physgun',
    openGraph: {
        type: "website",
        url: "https://physgun.ru",
        title: "Создать файл конфигурации сервера Garry\'s Mod | Physgun",
        description: "При помощи данного инструмента вы сможете быстро создать файл для настройки и запуска сервера Garry's Mod.",
        siteName: "Physgun.ru"
    }
}

export default function Home() {

    const schema =
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Генераторы",
                    "item": "https://physgun.ru"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Конфигурация сервера",
                    "item": "https://physgun.ru/generator/servercfg"
                },
            ]
        }

    return (<>
            <Script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
              />
            <section className={"flex flex-col gap-1"}>
                <Image src={hero} alt="Hero" className={"rounded-lg mb-3"} />
                <p className={"opacity-50"}>При помощи данного инструмента вы сможете быстро создать файл для настройки и запуска сервера Garry's Mod. Описание страницы включает в себя техническую конфигурацию, информацию о подключении к серверу, настройку игры и конфигурацию мастерской для загрузки дополнений. Эти сведения позволяют определить порт, на котором будет работать сервер, частоту обновления, максимальное количество игроков, выбрать режим игры и карту, а также указать ID коллекции мастерской для автоматической загрузки дополнений. Важно заполнить все поля, чтобы сгенерированный код работал правильно.</p>
                <FormComponent />
                <Divider className={"my-3"} orientation="left">Что дальше?</Divider>
                <p className={"opacity-50 mb-3"}>
                    А дальше нужно просто скопировать или скачать данный файл и заменить содержимое в файле вашего сервера "ПАПКА С СЕРВЕРОМ"/garrysmod/cfg/server.cfg
                </p>
                <Alert message="Обратите внимание, что эта инструкция предназначена для базового использования и может потребоваться дополнительная настройка в зависимости от ваших потребностей и конфигурации сервера." type="warning" />
            </section>
        </>
    )
}
