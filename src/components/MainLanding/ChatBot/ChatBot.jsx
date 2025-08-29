import React, { memo } from 'react';
import scss from './ChatBot.module.scss';

const ChatBotContent = React.memo(() => (
  <iframe
    src='https://interfaces.zapier.com/embed/chatbot/cmepsdf0a004878k51tyv3aln'
    allow='clipboard-write *'
    className={scss.iframeChat}
    title='Zapier Chatbot'
  />
));

export default memo(function ChatBot({ isChatOpen }) {
  return (
    <div className={scss.iframeChatPosition}>
      {isChatOpen && <ChatBotContent />}
      <div className={scss.blockWhite}></div>
    </div>
  );
});
