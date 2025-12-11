import React, { useEffect, useRef, useState } from 'react';
import MessageItem from '../MessageItem/MessageItem';
import useVoiceRecorder from '../useVoiceRecorder';
import styles from '../ChatImpossibleAD.module.scss';
import { BsMic, BsPaperclip, BsRecordCircle, BsSend, BsXLg, BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';
import { SiCss3 } from 'react-icons/si';
import clsx from 'clsx';

const STORAGE_KEY = 'chat_impossible_ad_messages_v1';

function loadMessages() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load messages', e);
    return [];
  }
}

function saveMessages(msgs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch (e) {
    console.warn('Failed to save messages', e);
  }
}

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState(() => {
    const m = loadMessages();
    if (m.length === 0) {
      const welcome = {
        id: 'm_welcome',
        type: 'text',
        content: 'Привіт, чим я можу допомогти?',
        timestamp: Date.now(),
        direction: 'incoming',
      };
      return [welcome];
    }
    return m;
  });

  const [text, setText] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const messagesEndRef = useRef(null);
  const { recorderState, startRecording, stopRecording, latestAudioBlob } = useVoiceRecorder();
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef(null);
  const textareaRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    saveMessages(messages);
    // scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const handleChange = (e) => {
    setText(e.target.value);

    const el = textareaRef.current;
    if (!el) return;

    const maxHeightPx = window.innerWidth * 0.07; // 7vw в px

    // 1) Сбрасываем высоту перед вычислением
    el.style.height = '0.75vw';

    // 2) Получаем фактическую высоту контента
    const newHeight = el.scrollHeight;

    // 3) Устанавливаем высоту без превышения maxHeight
    el.style.height = Math.min(newHeight, maxHeightPx) + 'px';

    // 4) Если текст пустой — возвращаем стандартную минимальную высоту
    if (e.target.value.trim().length === 0) {
      el.style.height = '0.75vw'; // твой дефолт
      setIsScrollable(false);
      return;
    }

    // 5) Если scrollHeight > maxHeight → включаем скролл
    setIsScrollable(newHeight > maxHeightPx);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setShowEmoji(false);
      }
    }

    if (showEmoji) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmoji]);

  useEffect(() => {
    if (latestAudioBlob) {
      // создаем голосовое сообщение
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        const msg = {
          id: 'a_' + Date.now(),
          type: 'audio',
          content: base64,
          mime: 'audio/webm',
          timestamp: Date.now(),
          direction: 'outgoing',
        };
        setMessages((prev) => [...prev, msg]);
      };
      reader.readAsDataURL(latestAudioBlob);
    }
  }, [latestAudioBlob]);

  const sendText = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg = {
      id: 't_' + Date.now(),
      type: 'text',
      content: trimmed,
      timestamp: Date.now(),
      direction: 'outgoing',
    };
    setMessages((prev) => [...prev, msg]);
    setText('');
  };

  const onFileSelected = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      const msg = {
        id: 'f_' + Date.now(),
        type: 'file',
        content: base64,
        fileName: file.name,
        mime: file.type || 'application/octet-stream',
        timestamp: Date.now(),
        direction: 'outgoing',
      };
      setMessages((prev) => [...prev, msg]);
      setFileInputKey(Date.now());
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendText();
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <div>Підтримка</div>
        <button className={styles.closeBtn} onClick={onClose} aria-label='Close chat'>
          <BsXLg className={styles.iconClose} />
        </button>
      </div>

      <div className={styles.messagesList}>
        {messages.map((m) => (
          <MessageItem key={m.id} message={m} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputRow}>
        <div className={styles.textInputWrap}>
          <input
            type='file'
            key={fileInputKey}
            id='chat_file_input'
            style={{ display: 'none' }}
            onChange={onFileSelected}
          />

          <label htmlFor='chat_file_input' className={styles.iconBtn} title='Attach file'>
            <BsPaperclip className={styles.icon} />
          </label>

          <textarea
            ref={textareaRef}
            className={`${styles.textInput} ${isScrollable ? styles.scrollEnabled : ''}`}
            placeholder='Напишіть повідомлення...'
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <button type='button' className={styles.emojiBtn} onClick={() => setShowEmoji((v) => !v)}>
            <BsEmojiSmile className={clsx(styles.icon, showEmoji && styles.emojiBtnColor)} />
          </button>

          {showEmoji && (
            <div className={styles.emojiPickerWrap} ref={emojiRef}>
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setText((prev) => prev + emojiData.emoji);
                  setShowEmoji(false);
                }}
                previewConfig={{ showPreview: false }}
                skinTonesDisabled={true}
              />
            </div>
          )}

          <button
            className={styles.iconButtonMic}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              if (recorderState === 'idle') startRecording();
              else stopRecording();
            }}
            title={recorderState === 'idle' ? 'Record voice' : 'Stop recording'}>
            {/* microphone */}
            {recorderState === 'recording' ? (
              <BsRecordCircle className={clsx(styles.icon, styles.record)} />
            ) : (
              <BsMic className={styles.icon} />
            )}
          </button>
        </div>

        <div className={styles.controlsRight}>
          <button className={styles.sendBtn} onClick={sendText} aria-label='Send message'>
            <BsSend className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
