import type { Metadata } from 'next'
import React from "react";

export const metadata: Metadata = {
    metadataBase: new URL('https://physgun.ru'),
    title: 'Авторизация | Physgun',
    description: 'Авторизация в системе physgun',
    keywords: 'gmod, garry\'s, mod, гмод, гарис, мод, генератор, генераторы, создание, упрощение, без, кода, код, start.bat, server.cfg, как запустить сервер, сервер, создать',
    creator: 'Physgun communication',
    publisher: 'Physgun',
    openGraph: {
        type: "website",
        url: "https://physgun.ru",
        title: "Авторизация | Physgun",
        description: "Авторизация в системе physgun",
        siteName: "Physgun.ru"
    }
}
export default function Layout({children,}: { children: React.ReactNode }) {
  return (
      <section className={"flex flex-col justify-center items-center h-full"}>
        {children}
      </section>
  )
}
