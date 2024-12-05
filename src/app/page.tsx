import React from "react";
import {NewsLetters} from "@/components/newsletter.component";
import {Metadata} from "next";
import Layout from "@/app/generator/layout";


export const metadata: Metadata = {
    metadataBase: new URL('https://physgun.ru'),
    
    title: 'Physgun - Облегчи свою разработку!',
    description: 'Единственный инструмент для разработчиков серверов Garry\'s Mod, любые инструменты на ваш вкус, от генератора до скрипта!',
    keywords: 'gmod, garry\'s, mod, гмод, гарис, мод, генератор, генераторы, создание, упрощение, без, кода, код, start.bat, server.cfg, как запустить сервер, сервер, создать',
    creator: 'Physgun communication',
    publisher: 'Physgun',
    openGraph: {
        type: "website",
        url: "https://physgun.ru",
        title: "Physgun - Облегчи свою разработку!",
        description: "Единственный инструмент для разработчиков серверов Garry\'s Mod, любые инструменты на ваш вкус, от генератора до скрипта!",
        siteName: "Physgun.ru"
    }
}

export default function Home() {
  return (
      <Layout>
        <p>Привет!</p>
      </Layout>
  )
}
