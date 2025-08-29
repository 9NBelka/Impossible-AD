import React, { memo } from 'react';
import scss from './ChatBot.module.scss';

export default memo(function ChatBot() {
  return (
    <div className={scss.iframeChatPosition}>
      <iframe
        src='https://interfaces.zapier.com/embed/chatbot/cmepsdf0a004878k51tyv3aln'
        allow='clipboard-write *'
        className={scss.iframeChat}
        loading='lazy' // Отложенная загрузка iframe
        title='Zapier Chatbot' // Добавлено для доступности
      />
      <div className={scss.blockWhite}></div>
    </div>
  );
});
