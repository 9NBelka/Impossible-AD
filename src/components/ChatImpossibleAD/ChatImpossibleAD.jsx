import React from 'react';
import ChatButton from './ChatButton/ChatButton';
import scss from './ChatImpossibleAD.module.scss';

export default function ChatImpossibleAD() {
  return (
    <div className={scss.chatRoot}>
      <ChatButton />
    </div>
  );
}
