"use client";
import {useState} from "react";
import {Alert, Button, Divider, Form, Input, InputNumber, Select} from "antd";
import {CopyOutlined, DownloadOutlined} from "@ant-design/icons";

type IFields = {
    port?: number;
    tickrate?: number;
    lan?: number;
    maxplayers?: number;
    map?: string;
    gamemode?: string;
    workshop?: number;
};
export default function FormComponent() {
    const [generated, setGenerated] = useState(false);
    const [toCopy,setToCopy] = useState("")
    async function generateFile(formData: IFields) {
        setGenerated(false);
        setToCopy(`start "SRCDS" /B srcds.exe -game garrysmod -conlog -port ${formData.port} -console -conclearlog -condebug -tvdisable -maxplayers ${formData.maxplayers} +gamemode ${formData.gamemode} +r_hunkalloclightmaps 0 +map ${formData.map} -tickrate ${formData.tickrate} +fps_max ${formData.tickrate} +host_workshop_collection "${formData.workshop || ""}" +sv_lan ${formData.lan}`)
        setGenerated(true);
    }

    const downloadBatFile = () => {
        const element = document.createElement("a");
        const file = new Blob([toCopy], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "start.bat";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <>
            <Form
                name="start.bat"
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={generateFile}
                layout="vertical"
            >

                <Divider className={"my-3"} orientation="left">Настройка сети</Divider>

                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Порт"
                        name="port"
                        className={"flex-1"}
                        extra="И так, это циферки которые будут после вашего IP к примеру 127.0.0.1:{ТУТ ПОРТ}, по стандарту можно указать 27015"
                        rules={[{ required: true, message: 'Пожалуйста введите порт 100-65535' }]}
                    >
                        <InputNumber min="100" max="65535" size={"large"} style={{width: "100%"}} />
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Тик-рейт"
                        name="tickrate"
                        extra="Частота обновления сервера. Чем выше число, тем больше нагрузка на ЦП. Подходящая частота обновления составляет около 30. Максимум: 128."
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Пожалуйста введите тик-рейт сервера 12-128' }]}
                    >
                        <InputNumber min="12" max="128" size={"large"} style={{width: "100%"}} />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Видимость в сети"
                        name="lan"
                        extra="Ну тут просто, хотите ли вы чтобы ваш сервер видели в сети?."
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Выберите видимость сервера' }]}
                    >
                        <Select
                            size={"large"}
                            options={[
                                { value: 0, label: 'Да мой сервер будет виден всем' },
                                { value: 1, label: 'Я буду играть только локально' },
                            ]}
                        />
                    </Form.Item>
                </div>

                <Divider className={"my-3"} orientation="left">Настройка игры</Divider>

                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Слоты"
                        name="maxplayers"
                        className={"flex-1"}
                        extra="И так, чем больше игроков на сервере, тем больше нагрузка на процессор, можно конечно уменьшить тик-рейт, но лагать сервер будет сильно"
                        rules={[{ required: true, message: 'Пожалуйста введите кол-во слотов 1-128' }]}
                    >
                        <InputNumber min="1" max="128" size={"large"} style={{width: "100%"}} />
                    </Form.Item>

                    <Form.Item<IFields>
                        label="Игровой режим"
                        name="gamemode"
                        extra="Игровой режим сервера, укажите системное название к примеру если выхотите DarkRP введите darkrp"
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Пожалуйста введите игровой режим' }]}
                    >
                        <Input size={"large"} style={{width: "100%"}} />
                    </Form.Item>
                    <Form.Item<IFields>
                        label="Карта"
                        name="map"
                        extra="Ну какой сервер без карты, тут уже нужно самому искать системное название карты к примеру gm_flatgrass"
                        className={"flex-1"}
                        rules={[{ required: true, message: 'Пожалуйста введите название карты' }]}
                    >
                        <Input size={"large"} style={{width: "100%"}} />
                    </Form.Item>
                </div>

                <Divider className={"my-3"} orientation="left">Другое</Divider>

                <div className="flex flex-row gap-6 w-100">
                    <Form.Item<IFields>
                        label="Коллекция Workshop"
                        name="workshop"
                        className={"flex-1"}
                        extra="Крайне рекомендуют использовать Workshop, в качестве FastDL, создайте коллекцию в Steam и вставьте сюда ID данной коллекции."
                    >
                        <InputNumber min={0} size={"large"} style={{width: "100%"}} />
                    </Form.Item>
                    <div className="flex-1"></div>
                    <div className="flex-1"></div>
                </div>


                <div className="flex flex-row-reverse">
                    <Form.Item className={"m-0 p-0"}>
                        <Button type="primary" htmlType="submit" size={"large"} className={"bg-blue-600"}>
                            Создать код
                        </Button>
                    </Form.Item>
                </div>
            </Form>
            {generated &&
                <div className="flex flex-col bg-neutral-950 rounded-lg mt-5 p-5 gap-5">
                    <Alert message="Ваш файл успешно создан!" type="success" showIcon />
                    <div className="flex flex-col text-neutral-400">
                        <p className={"p-0 m-0 text-neutral-700"}>REM Configuration file generated by physgun.ru</p>
                        <p className={"p-0 m-0"}>{toCopy}</p>
                    </div>
                    <div className="flex flex-row-reverse gap-2">
                        <Button className={"bg-blue-600 opacity-50 hover:opacity-100"} onClick={() => {downloadBatFile()}} type="primary" icon={<DownloadOutlined />} size={"large"} />
                        <Button className={"opacity-70  hover:opacity-100"} onClick={() => {navigator.clipboard.writeText(toCopy)}} type="dashed" icon={<CopyOutlined />} size={"large"} />
                    </div>
                </div>
            }
        </>
    )
}
