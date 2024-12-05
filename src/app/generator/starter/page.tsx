import FormComponent from "@/app/generator/starter/form.component";
import Image from "next/image";
import hero from "@/assets/heros/starter.png";
import {Alert, Divider} from "antd";
import React from "react";
import {Metadata} from "next";
import Head from "next/head";
import Script from "next/script";

export const metadata: Metadata = {
    metadataBase: new URL('https://physgun.ru'),
    
    title: 'Создать файл запуска сервера Garry\'s Mod | Physgun',
    description: 'При помощи данного инструмента вы сможете быстро создать файл запуска для сервера Garry\'s Mod',
    keywords: 'gmod, garry\'s, mod, гмод, гарис, мод, генератор, генераторы, создание, упрощение, без, кода, код, start.bat, server.cfg, как запустить сервер, сервер, создать',
    creator: 'Physgun communication',
    publisher: 'Physgun',
    openGraph: {
        type: "website",
        url: "https://physgun.ru",
        title: "Создать файл запуска сервера Garry\'s Mod | Physgun",
        description: "При помощи данного инструмента вы сможете быстро создать файл запуска для сервера Garry\'s Mod",
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
                    "name": "Файл запуска сервера",
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
                  <ol className="list-decimal ps-5">
                      <li>Откройте текстовый редактор, такой как Блокнот, на вашем компьютере.</li>
                      <li>Вставьте код выше в текстовый редактор</li>
                      <li>Сохраните файл с расширением .bat. Например, вы можете назвать его "start_server.bat".</li>
                      <li>Убедитесь, что ваш .bat файл находится в той же папке, где находится файл srcds.exe.</li>
                      <li>Теперь, чтобы запустить ваш .bat файл и сервер, выполните следующие шаги:
                          <ol className="list-decimal ps-5">
                              <li>Дважды щелкните на .bat файле, который вы создали. Это запустит командную строку и начнет выполнение команд в файле.</li>
                              <li>Подождите некоторое время, пока сервер полностью загрузится. Вам может потребоваться некоторое время, чтобы сервер запустился и стал доступным для подключения.</li>
                          </ol>
                      </li>
                  </ol>
              </p>
              <Alert message="Обратите внимание, что эта инструкция предназначена для базового использования и может потребоваться дополнительная настройка в зависимости от ваших потребностей и конфигурации сервера." type="warning" />
          </section>
      </>
  )
}
