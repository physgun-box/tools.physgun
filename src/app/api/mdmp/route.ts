import { NextRequest, NextResponse } from 'next/server';

// Тип для ответа с DLL путями и консольной историей
interface DllResponse {
  dlls: string[];
  console: string[] | null;
}

// Функция для извлечения истории консоли из бинарных данных
function extractConsoleHistory(data: Buffer): string[] | null {
  const startMarker = "Console History (reversed)";
  const nulByte = 0x00;
  const newLineByte = 0x0A; // Символ новой строки (\n)

  let startIndex = data.indexOf(startMarker);

  if (startIndex === -1) {
    console.log('Не найден маркер "Console History (reversed)"');
    return null;
  }

  let historyData: string[] = [];
  let currentLine = '';
  let i = startIndex + startMarker.length;

  while (i < data.length) {
    if (data[i] === nulByte) {
      break; // Останавливаем, если встретили NUL байт
    }

    if (data[i] === newLineByte) {
      // Когда встречаем символ новой строки, добавляем текущую строку в массив и сбрасываем ее
      historyData.push(currentLine);
      currentLine = '';
    } else {
      // Добавляем символ в текущую строку
      currentLine += String.fromCharCode(data[i]);
    }

    i++;
  }

  // Добавляем последнюю строку, если она не пустая
  if (currentLine) {
    historyData.push(currentLine);
  }

  return historyData;
}

// Функция для извлечения путей к DLL из файла
function extractDllPaths(fileBuffer: Buffer): DllResponse {
  let consoleloglast: string[] | null = null;

  consoleloglast = extractConsoleHistory(fileBuffer);

  // Убираем управляющие символы (коды от 0 до 31 и 127)
  const cleanedBinaryContent = fileBuffer.filter(byte => byte > 31 && byte !== 127);

  // Преобразуем оставшийся контент в строку
  let textContent = Buffer.from(cleanedBinaryContent).toString('utf-8');
  // Удаляем "неверные" символы
  textContent = textContent.replace(/�/g, '').replace(/NUL/g, '');

  // Извлекаем пути к DLL с помощью регулярного выражения
  const regex = /[a-zA-Z]:\\[^:]*?\.dll/gi;
  const matches = textContent.match(regex);

  return { dlls: matches || [], console: consoleloglast };
}

// Обработка POST запроса
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Чтение данных формы
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    // Проверка, что файл был загружен
    if (!file) {
      return NextResponse.json({ error: 'Необходимо загрузить файл' }, { status: 400 });
    }

    // Преобразование содержимого файла в Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Извлечение путей к DLL из содержимого файла
    const result = extractDllPaths(fileBuffer);

    // Возврат результата
    return NextResponse.json(result);
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка обработки запроса' }, { status: 500 });
  }
}
