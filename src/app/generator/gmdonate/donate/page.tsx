import FormComponent from "@/app/generator/gmdonate/donate/form.component";
import Image from "next/image";
import hero from "@/assets/heros/gmdonate.png";
import {Alert, Divider} from "antd";
import React from "react";
import {Metadata} from "next";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
    metadataBase: new URL('https://physgun.ru'),
    
    title: 'Создать код продукта для автодоната GM-Donate | Physgun',
    description: 'Это генератор базовых предметов для автодоната gm-donate, если не разбираетесь в коде для вас это лучший и единственный инструмент в своем роде',
    keywords: 'gmod, garry\'s, mod, гмод, гарис, мод, генератор, генераторы, создание, упрощение, без, кода, код, start.bat, server.cfg, как запустить сервер, сервер, создать',
    creator: 'Physgun communication',
    publisher: 'Physgun',
    openGraph: {
        type: "website",
        url: "https://physgun.ru",
        title: "Создать код продукта для автодоната GM-Donate | Physgun",
        description: "Это генератор базовых предметов для автодоната gm-donate, если не разбираетесь в коде для вас это лучший и единственный инструмент в своем роде",
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
                    "name": "Донат для GM-Donate",
                    "item": "https://physgun.ru/generator/gmdonate/donate"
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
              <p className={"opacity-50"}>Это генератор базовых предметов для автодоната gm-donate, если не разбираетесь в коде для вас это лучший и единственный инструмент в своем роде, в скором времени мы доработаем инструмент и сделаем его обширнее. Важно заполнить все поля, чтобы сгенерированный код работал правильно.</p>
              <FormComponent />
              <Divider className={"my-3"} orientation="left">Что дальше?</Divider>
              <p className={"opacity-50 mb-3"}>
                  А дальше нужно просто скопировать код и вставить в файл конфигурации продуктов в системе gm-donate
              </p>
              <Alert message="Обратите внимание, что эта инструкция предназначена для базового использования и может потребоваться дополнительная настройка в зависимости от ваших потребностей. Более подробно можно узнать на сайте gm-donate.net" type="warning" />
          </section>
      </>
  )
}
