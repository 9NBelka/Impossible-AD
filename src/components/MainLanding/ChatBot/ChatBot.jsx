import React, { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Привет 👋 Я твой онлайн-помощник.' },
  ]);
  const [input, setInput] = useState('');

  // ⚠️ сюда вставь свой webhook из Make
  const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/3avlu7axojiz4ausryvj5sexnwhigvh6';

  const sendMessage = async () => {
    if (!input.trim()) return;

    // добавляем сообщение юзера
    const newMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json(); // Make должен вернуть JSON
      setMessages((prev) => [...prev, { from: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: '⚠️ Ошибка соединения с ботом.' }]);
    }
  };

  return (
    <div className='flex flex-col w-96 h-96 border rounded-lg p-3 bg-white shadow'>
      <div className='flex-1 overflow-y-auto mb-2'>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 my-1 rounded-xl ${
              m.from === 'user'
                ? 'bg-blue-500 text-white self-end ml-auto max-w-[80%]'
                : 'bg-gray-200 text-black self-start mr-auto max-w-[80%]'
            }`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className='flex'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-1 border rounded-l-lg p-2'
          placeholder='Напиши сообщение...'
        />
        <button onClick={sendMessage} className='bg-blue-500 text-white px-4 rounded-r-lg'>
          ➤
        </button>
      </div>
    </div>
  );
}
