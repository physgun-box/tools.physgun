"use client";
import { useState } from "react";
import { Alert, Button, Form, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import FileExclamationOutlined from "@ant-design/icons/FileExclamationOutlined";

// Типизация для ответа от сервера
interface DllResponse {
  dlls: string[];
  console: string[] | null;
}

export default function FormComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<DllResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Обработчик выбора файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Обработчик загрузки файла
  const handleFileUpload = async () => {
    if (!file) {
      message.error("Пожалуйста, выберите файл для загрузки");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Отправка файла на сервер
      const response = await fetch("/api/mdmp", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Ошибка загрузки файла.");
      }

      const result: DllResponse = await response.json();
      setResponse(result);
    } catch (error: any) {
      setError(error.message || "Произошла ошибка при отправке.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form name="file-upload-form" layout="vertical" size="large">
        {/* Поле для загрузки файла */}
        <Form.Item
          name="file"
          label="Загрузите файл"
          rules={[{ required: true, message: "Пожалуйста, загрузите файл!" }]}
        >
          <div className="relative w-full">
            <input
              type="file"
              accept=".mdmp,.txt,.log"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="flex justify-center items-center w-full py-5 bg-neutral-800 text-white rounded-lg border-2 border-dashed border-neutral-600 hover:bg-neutral-700 cursor-pointer">
              {file ? (
                <span className="truncate text-center">{file.name}</span>
              ) : (
                <span>Выберите файл</span>
              )}
            </div>
          </div>
        </Form.Item>

        {/* Кнопка для загрузки файла */}
        <Button
          type="primary"
          icon={<CopyOutlined />}
          onClick={handleFileUpload}
          loading={loading}
          disabled={loading || !file}
        >
          Загрузить файл
        </Button>
      </Form>

      {/* Ошибка, если она есть */}
      {error && (
        <Alert
          message="Ошибка"
          description={error}
          type="error"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}

      {/* Ответ от сервера */}
      {response && (
        <>
          <div className="flex flex-col w-full max-h-[600px] py-3 bg-neutral-950 rounded-xl text-zinc-300" style={{ marginTop: 20 }}>
            <div className="border-b pb-3 px-3 ps-4 text-zinc-400 border-b-zinc-700 flex flex-row gap-2 items-center">
              <FileExclamationOutlined />
              <span>Консоль</span>
            </div>
            <div className="overflow-auto flex-1 mx-3">
              {response?.console?.map((line, index) => line.length > 0 && (
                <div key={index} className="flex gap-2">
                  <span className="text-gray-500">{index + 1}</span>
                  <p className="flex-1">{line}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full max-h-[700px] py-3 bg-neutral-950 rounded-xl text-zinc-300" style={{ marginTop: 20 }}>
            <div className="border-b pb-3 px-3 ps-4 text-zinc-400 border-b-zinc-700 flex flex-row gap-2 items-center">
              <FileExclamationOutlined />
              <span>Список используемых DLL файлов</span>
            </div>
            <div className="overflow-auto flex-1 mx-3">
              {response?.dlls?.map((line, index) => line.length > 0 && (
                <div key={index} className="flex gap-2">
                  <span className="text-gray-500">{index + 1}</span>
                  <p className="flex-1 text-emerald-500">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}