import FormComponent from "@/app/tools/mdmp/form.component";
import Image from "next/image";
import hero from "@/assets/heros/cdump.png";
import {Alert, Divider} from "antd";
import React from "react";
import {Metadata} from "next";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
    metadataBase: new URL('https://physgun.ru'),
    
    title: 'Анализатор (парсер) mdmp файлов Garry\'s Mod | Physgun',
    description: 'При помощи данного инструмента вы сможете быстро изучить Crash Dump (mdmp) Garry\'s Mod, Открыть файл mdmp, Открыть краш дамп гарис мод',
    keywords: 'gmod, garry\'s, mod, гмод, гарис, мод, генератор, генераторы, создание, упрощение, без, кода, код, start.bat, server.cfg, как запустить сервер, сервер, создать',
    creator: 'Physgun communication',
    publisher: 'Physgun',
    openGraph: {
        type: "website",
        url: "https://physgun.ru",
        title: "Анализатор (парсер) mdmp файлов Garry\'s Mod | Physgun",
        description: "При помощи данного инструмента вы сможете быстро изучить Crash Dump (mdmp) Garry\'s Mod",
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
                    "name": "Инструменты",
                    "item": "https://physgun.ru"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Анализ Crash Dump",
                    "item": "https://physgun.ru/tools/mdmp"
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
              <p className={"opacity-50"}>Тут вы сможете проанализировать данные из ВАШЕГО .mdmp файла, узнать последний лог консольки, а также узнать какие dll файлы были исользованны при работе Garry's Mod</p>
              <FormComponent />
          </section>
      </>
  )
}
