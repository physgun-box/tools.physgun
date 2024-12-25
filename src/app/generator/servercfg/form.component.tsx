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

    sv_region?: number;
    sv_location?: string;
    sv_contact?: string;
    sv_hibernate_think?: number;
    sv_stats?: number;
    collision_shake_amp?: number;
    collision_shake_freq?: number;
    collision_shake_time?: number;
    lua_error_url?: string;
    sv_minrate?: number;
    sv_maxrate?: number;
    sv_minupdaterate?: number;
    sv_mincmdrate?: number;
    sv_maxcmdrate?: number;
    sv_friction?: number;
    sv_accelerate?: number;
    sv_airaccelerate?: number;

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

// Дополнительные параметры
${formData.sv_minrate !== undefined ? `sv_minrate ${formData.sv_minrate}` : "// sv_minrate (мы не стали его указывать)"}
${formData.sv_maxrate !== undefined ? `sv_maxrate ${formData.sv_maxrate}` : "// sv_maxrate (мы не стали его указывать)"}
${formData.sv_minupdaterate !== undefined ? `sv_minupdaterate ${formData.sv_minupdaterate}` : "// sv_minupdaterate (мы не стали его указывать)"}
${formData.sv_mincmdrate !== undefined ? `sv_mincmdrate ${formData.sv_mincmdrate}` : "// sv_mincmdrate (мы не стали его указывать)"}
${formData.sv_maxcmdrate !== undefined ? `sv_maxcmdrate ${formData.sv_maxcmdrate}` : "// sv_maxcmdrate (мы не стали его указывать)"}
${formData.sv_friction !== undefined ? `sv_friction ${formData.sv_friction}` : "// sv_friction (мы не стали его указывать)"}
${formData.sv_accelerate !== undefined ? `sv_accelerate ${formData.sv_accelerate}` : "// sv_accelerate (мы не стали его указывать)"}
${formData.sv_airaccelerate !== undefined ? `sv_airaccelerate ${formData.sv_airaccelerate}` : "// sv_airaccelerate (мы не стали его указывать)"}
${formData.sv_region !== undefined ? `sv_region ${formData.sv_region}` : "// sv_region (мы не стали его указывать)"}
${formData.sv_hibernate_think !== undefined ? `sv_hibernate_think ${formData.sv_hibernate_think}` : "// sv_hibernate_think (мы не стали его указывать)"}
${formData.sv_stats !== undefined ? `sv_stats ${formData.sv_stats}` : "// sv_stats (мы не стали его указывать)"}
${formData.collision_shake_amp !== undefined ? `collision_shake_amp ${formData.collision_shake_amp}` : "// collision_shake_amp (мы не стали его указывать)"}
${formData.collision_shake_freq !== undefined ? `collision_shake_freq ${formData.collision_shake_freq}` : "// collision_shake_freq (мы не стали его указывать)"}
${formData.collision_shake_time !== undefined ? `collision_shake_time ${formData.collision_shake_time}` : "// collision_shake_time (мы не стали его указывать)"}
${formData.lua_error_url !== undefined ? `lua_error_url "${formData.lua_error_url}"` : "// lua_error_url (мы не стали его указывать)"}\`)

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
                initialValues={{remember: true}}
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
                        rules={[{required: true, message: 'Пожалуйста введите название сервера!'}]}
                    >
                        <Input size={"large"}/>
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Пароль сервера"
                        name="sv_password"
                        extra="Если вы не хотите чтобы кто-то мог зайти на ваш сервер, напишите тут любой пароль."
                        className={"flex-1"}
                    >
                        <Input.Password size={"large"}/>
                    </Form.Item>
                    <Form.Item<IFields>
                        label="RCON пароль"
                        name="rcon_password"
                        extra="По скольку Garry's Mod довольно дырявая игра, можете написать тут рандомные символы и забыть."
                        className={"flex-1"}
                        rules={[{required: true, message: 'Пожалуйста введите RCON пароль сервера!'}]}
                    >
                        <Input.Password size={"large"}/>
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
                        <Input size={"large"}/>
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Загрузка клиентских спреев"
                        name="sv_allowupload"
                        extra="Ууу, если ты застал времена cs:source то ты знаешь что это, а если нет, то отключай ибо это очень дырявая функция."
                        className={"flex-1"}
                        rules={[{required: true, message: 'Необходимо заполнить данный пункт'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Отключить (рекомендуется)'},
                                {value: 1, label: 'Включить'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Метод загрузки контента"
                        name="sv_allowdownload"
                        extra="И так, тоже довольно дырявая функция, лучше выбрать загрузку при помощи FastDL."
                        className={"flex-1"}
                        rules={[{required: true, message: 'Необходимо заполнить данный пункт'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Загрузка через FastDL'},
                                {value: 1, label: 'Загрузка напрямую'},
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
                        <Input size={"large"}/>
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Максимальный размер пакета"
                        name="net_maxfilesize"
                        className={"flex-1"}
                        extra="Используйте если знаете, лучшее значение 16"
                        rules={[{required: true, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <InputNumber min={1} max={64} size={"large"} suffix={"mb"} style={{width: "100%"}}/>
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
                        rules={[{required: true, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: "off", label: 'Отключить'},
                                {value: "on", label: 'Включить'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Логирование банов"
                        name="sv_logbans"
                        className={"flex-1"}
                        extra="Логирование банов игроков на сервере"
                        rules={[{required: true, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Отключить'},
                                {value: 1, label: 'Включить'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Эхо логирование"
                        name="sv_logecho"
                        extra="Нужно ли вам вывод всякого мусора в консоль?"
                        className={"flex-1"}
                        rules={[{required: true, message: 'Необходимо заполнить данный пункт'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Отключить'},
                                {value: 1, label: 'Включить'},
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
                        rules={[{required: true, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Отключить'},
                                {value: 1, label: 'Включить'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Тип сохранения логов"
                        name="sv_log_onefile"
                        className={"flex-1"}
                        extra="Лучше выбрать сохранение в разные файлы."
                        rules={[{required: true, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Сохранять в один файл'},
                                {value: 1, label: 'Сохранять в разные файлы'},
                            ]}
                        />
                    </Form.Item>
                    <div className="flex-1"></div>
                </div>

                <Divider className={"my-3"} orientation="left">Другое</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Регион"
                        name="sv_region"
                        className={"flex-1"}
                        extra="Определяет регион сервера для поиска серверов"
                        rules={[{required: false, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'US - East'},
                                {value: 1, label: 'US - West'},
                                {value: 2, label: 'South America'},
                                {value: 3, label: 'Europe'},
                                {value: 4, label: 'Asia'},
                                {value: 5, label: 'Australia'},
                                {value: 6, label: 'Middle East'},
                                {value: 17, label: 'Africa'},
                                {value: 255, label: 'World (default)\n'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Гибернация"
                        name="sv_hibernate_think"
                        className={"flex-1"}
                        extra="Включить работу всех таймеров без наличия игроков и ботов"
                        rules={[{required: false, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Нет'},
                                {value: 1, label: 'Да'},
                            ]}
                        />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Сбор статистики"
                        name="sv_stats"
                        extra="Хотим ли мы включать сбор статистики сервера?"
                        className={"flex-1"}
                        rules={[{required: false, message: 'Необходимо заполнить данный пункт'}]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                {value: 0, label: 'Нет'},
                                {value: 1, label: 'Да'},
                            ]}
                        />
                    </Form.Item>
                </div>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Сбор ошибок"
                        name="lua_error_url"
                        className={"flex-1"}
                        extra="Можно настроить отправку всех Lua ошибок на web сервер), укажите тут ссылку куда будут отправляться все ошибки"
                        rules={[{required: false, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <Input size={"large"}/>
                    </Form.Item>
                </div>

                <Divider className={"my-3"} orientation="left">Физика</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Амплитуда эффекта тряски от пропов"
                        name="collision_shake_amp"
                        className={"flex-1"}
                        extra="По названию и так понятно"
                        rules={[{required: false, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <InputNumber min={0} max={255} size={"large"} style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Частота эффекта тряски от пропов"
                        name="collision_shake_freq"
                        className={"flex-1"}
                        extra="По названию и так понятно"
                        rules={[{required: false, message: 'Необходимо заполнить данное поле'}]}
                    >
                        <InputNumber min={0} max={255} size={"large"} style={{width: "100%"}}/>
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Длительность эффекта тряски"
                        name="collision_shake_time"
                        extra="По названию и так понятно"
                        className={"flex-1"}
                        rules={[{required: false, message: 'Необходимо заполнить данный пункт'}]}
                    >
                        <InputNumber min={0} max={255} size={"large"} style={{width: "100%"}}/>
                    </Form.Item>
                </div>

                <Divider className="my-3" orientation="left">Скорость передачи данных</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item
                        label="Минимальная скорость передачи данных"
                        name="sv_minrate"
                        className="flex-1"
                        extra="Минимальная скорость передачи данных от клиента к серверу. Значение влияет на стабильность соединения при низкой скорости интернета. (Стандартное значение: 3500)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Максимальная скорость передачи данных"
                        name="sv_maxrate"
                        className="flex-1"
                        extra="Максимальная скорость передачи данных от клиента к серверу. Значение 0 означает отсутствие ограничений. (Стандартное значение: 0)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                </div>

                <Divider className="my-3" orientation="left">Частота обновлений</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item
                        label="Минимальное количество обновлений"
                        name="sv_minupdaterate"
                        className="flex-1"
                        extra="Минимальное количество обновлений состояния игры, отправляемых клиенту каждую секунду. Чем выше значение, тем стабильнее отображение игрового процесса. (Стандартное значение: 1)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Максимальное количество обновлений"
                        name="sv_maxupdaterate"
                        className="flex-1"
                        extra="Максимальное количество обновлений состояния игры, отправляемых клиенту каждую секунду. Повышение значения может улучшить плавность, но увеличивает нагрузку на сервер. (Стандартное значение: 66)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                </div>

                <Divider className="my-3" orientation="left">Частота команд</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item
                        label="Минимальная частота команд"
                        name="sv_mincmdrate"
                        className="flex-1"
                        extra="Минимальная частота команд, которые клиент может отправлять на сервер. Значение 0 означает отсутствие ограничений. (Стандартное значение: 0)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Максимальная частота команд"
                        name="sv_maxcmdrate"
                        className="flex-1"
                        extra="Максимальная частота команд, которые клиент может отправлять на сервер. Ограничение частоты может снизить нагрузку на сервер. (Стандартное значение: 40)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                </div>

                <Divider className="my-3" orientation="left">Разгон игрока</Divider>
                <div className="flex flex-row gap-6 w-100">
                    <Form.Item
                        label="Коэффициент трения"
                        name="sv_friction"
                        className="flex-1"
                        extra="Коэффициент трения, влияющий на замедление игрока после остановки. Более высокое значение делает остановку более резкой. (Стандартное значение: 4)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Ускорение движения вперёд"
                        name="sv_accelerate"
                        className="flex-1"
                        extra="Степень ускорения игрока при движении вперед. Более высокое значение увеличивает скорость старта. (Стандартное значение: 5)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Ускорение в воздухе"
                        name="sv_airaccelerate"
                        className="flex-1"
                        extra="Степень ускорения игрока во время прыжков и полёта. Увеличение значения позволяет более динамично маневрировать в воздухе. (Стандартное значение: 10)"
                        rules={[{ required: false, message: 'Необходимо заполнить данное поле' }]}
                    >
                        <InputNumber min={0} size="large" style={{ width: '100%' }} />
                    </Form.Item>
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
                    <Alert message="Ваш файл успешно создан!" type="success" showIcon/>
                    <div className="flex flex-col text-neutral-400">
                        {textWithBreaks}
                    </div>
                    <div className="flex flex-row-reverse gap-2">
                        <Button onClick={() => {
                            downloadCfgFile()
                        }} type="dashed" icon={<DownloadOutlined/>} size={"large"}/>
                        <Button onClick={() => {
                            navigator.clipboard.writeText(toCopy)
                        }} type="dashed" icon={<CopyOutlined/>} size={"large"}/>
                    </div>
                </div>
            }
        </>
    );
}