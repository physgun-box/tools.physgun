"use client";
import React, {useState} from "react";
import {Alert, Button, Divider, Form, Input, InputNumber, Select} from "antd";
import hero from "@/assets/heros/servercfg.png"
import {CopyOutlined, DownloadOutlined} from "@ant-design/icons";
import Image from "next/image";

type IFields = {
    hostname?: string;
    sv_password?: string;
    rcon_password?: string;

    sv_loadingurl?: string;
    sv_downloadurl?: string;
    sv_allowdownload?: number;
    sv_allowupload?: number;
    net_maxfilesize?: number;

    log?: string;
    sv_logbans?: number;
    sv_logecho?: number;
    sv_logfile?: number;
    sv_log_onefile?: number;
};

export default function FormComponent() {
    const [generated, setGenerated] = useState(false);
    const [toCopy,setToCopy] = useState("")

    async function generateFile(formData: IFields) {
        setGenerated(false);
        console.log(formData)
        setToCopy(`// Базовая конфигурация
hostname "${formData.hostname}"
${formData.sv_password !== undefined ?`sv_password "${formData.sv_password}"` : "// sv_password (мы не стали его указывать)"}
${formData.rcon_password  !== undefined ? `rcon_password "${formData.rcon_password}"` : "// rcon_password (мы не стали его указывать)"}

// Конфигурация сети
${formData.sv_loadingurl !== undefined ?`sv_loadingurl "${formData.sv_loadingurl}"` : "// sv_loadingurl (мы не стали его указывать)"}
${formData.sv_downloadurl !== undefined ?`sv_downloadurl "${formData.sv_downloadurl}"` : "// sv_downloadurl (мы не стали его указывать)"}
sv_allowdownload ${formData.sv_allowdownload}
sv_allowupload ${formData.sv_allowupload}
net_maxfilesize ${formData.net_maxfilesize}

// Конфигурация логирования
log ${formData.log}
sv_logbans ${formData.sv_logbans}
sv_logecho ${formData.sv_logecho}
sv_logfile ${formData.sv_logfile}
sv_log_onefile ${formData.sv_log_onefile}

// Исполнение банлиста (хз зачем но пусть будет)
exec banned_user.cfg
exec banned_ip.cfg`)
        setGenerated(true);
    }

    const textWithBreaks = toCopy.split('\n').map((text, index) => (
        <React.Fragment key={index}>
            {text}
            <br />
        </React.Fragment>
    ));

    const downloadCfgFile = () => {
        const element = document.createElement("a");
        const file = new Blob([toCopy], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "server.cfg";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <>
            <Form
                name="server.cfg"
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={generateFile}
                layout="vertical"
            >
                <Divider className={"my-3"} orientation="left">Базовая настройка</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Имя сервера"
                        name="hostname"
                        className={"flex-1"}
                        extra="Название сервера может содержать в себе смайлики, но работать будут только на Chromium версии игры."
                        rules={[{ required: true, message: 'Пожалуйста введите название сервера!' }]}
                    >
                        <Input size={"large"} />
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Пароль сервера"
                        name="sv_password"
                        extra="Если вы не хотите чтобы кто-то мог зайти на ваш сервер, напишите тут любой пароль."
                        className={"flex-1"}
                    >
                        <Input.Password size={"large"} />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="RCON пароль"
                        name="rcon_password"
                        extra="По скольку Garry's Mod довольно дырявая игра, можете написать тут рандомные символы и забыть."
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Пожалуйста введите RCON пароль сервера!' }]}
                    >
                        <Input.Password size={"large"} />
                    </Form.Item>
                </div>

                <Divider className={"my-3"} orientation="left">Настройка сети</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Ссылка на экран загрузки"
                        name="sv_loadingurl"
                        className={"flex-1"}
                        extra="Тут тема сложная, нужно делать, кодить, крч как узнаешь что да как, можешь редактировать"
                    >
                        <Input size={"large"} />
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Загрузка клиентских спреев"
                        name="sv_allowupload"
                        extra="Ууу, если ты застал времена cs:source то ты знаешь что это, а если нет, то отключай ибо это очень дырявая функция."
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Необходимо заполнить данный пункт' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Отключить (рекомендуется)' },
                                { value: 1, label: 'Включить' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Метод загрузки контента"
                        name="sv_allowdownload"
                        extra="И так, тоже довольно дырявая функция, лучше выбрать загрузку при помощи FastDL."
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Необходимо заполнить данный пункт' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Загрузка через FastDL' },
                                { value: 1, label: 'Загрузка напрямую' },
                            ]}
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Ссылка на контент FastDL"
                        name="sv_downloadurl"
                        className={"flex-1"}
                        extra="Используйте если знаете, а так лучше оставьте после пустым"
                    >
                        <Input size={"large"} />
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Максимальный размер пакета"
                        name="net_maxfilesize"
                        className={"flex-1"}
                        extra="Используйте если знаете, лучшее значение 16"
                        rules={[{ required: true, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={1} max={64} size={"large"} suffix={"mb"}  style={{width: "100%"}} />
                    </Form.Item>
                    <div className="flex-1"></div>
                </div>
                <Divider className={"my-3"} orientation="left">Настройка логирования</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Активация логирования"
                        name="log"
                        className={"flex-1"}
                        extra="Нужно ли вам логирование на сервере?"
                        rules={[{ required: true, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: "off", label: 'Отключить' },
                                { value: "on", label: 'Включить' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Логирование банов"
                        name="sv_logbans"
                        className={"flex-1"}
                        extra="Логирование банов игроков на сервере"
                        rules={[{ required: true, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Отключить' },
                                { value: 1, label: 'Включить' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Эхо логирование"
                        name="sv_logecho"
                        extra="Нужно ли вам вывод всякого мусора в консоль?"
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Необходимо заполнить данный пункт' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Отключить' },
                                { value: 1, label: 'Включить' },
                            ]}
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Сохранение логов в файлов"
                        name="sv_logfile"
                        className={"flex-1"}
                        extra="Сохранять логи сервера в файл или нет."
                        rules={[{ required: true, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Отключить' },
                                { value: 1, label: 'Включить' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Тип сохранения логов"
                        name="sv_log_onefile"
                        className={"flex-1"}
                        extra="Лучше выбрать сохранение в разные файлы."
                        rules={[{ required: true, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Сохранять в один файл' },
                                { value: 1, label: 'Сохранять в разные файлы' },
                            ]}
                        />
                    </Form.Item>
                    <div className="flex-1"></div>
                </div>

                <div className="flex flex-row-reverse">
                    <Form.Item className={"m-0 p-0"}>
                        <Button type="primary" htmlType="submit" size={"large"} className={"bg-blue-600"}>
                            Создать конфиг
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            {generated &&
                <div className="flex flex-col bg-neutral-950 rounded-lg mt-5 p-5 gap-5">
                    <Alert message="Ваш файл успешно создан!" type="success" showIcon />
                    <div className="flex flex-col text-neutral-400">
                        {textWithBreaks}
                    </div>
                    <div className="flex flex-row-reverse gap-2">
                        <Button onClick={() => {downloadCfgFile()}} type="dashed" icon={<DownloadOutlined />} size={"large"} />
                        <Button onClick={() => {navigator.clipboard.writeText(toCopy)}} type="dashed" icon={<CopyOutlined />} size={"large"} />
                    </div>
                </div>
            }
        </>
    );
}