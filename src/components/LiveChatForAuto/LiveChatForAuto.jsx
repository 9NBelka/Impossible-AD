import { useEffect } from 'react';

export default function LiveChatForAuto() {
  useEffect(() => {
    // Создаем скрипт
    const script = document.createElement('script');
    script.src = 'https://cdn.pulse.is/livechat/loader.js';
    script.setAttribute('data-live-chat-id', '68d283ad174df7ee220ec0e7');
    script.async = true;

    // Добавляем скрипт в body
    document.body.appendChild(script);

    // Очистка при размонтировании компонента
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Компонент не рендерит ничего в DOM
}
