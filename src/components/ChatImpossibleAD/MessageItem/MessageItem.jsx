import React from 'react';
import styles from '../ChatImpossibleAD.module.scss';
import VoiceMessage from '../VoiceMessage/VoiceMessage';
import clsx from 'clsx';

export default function MessageItem({ message }) {
  const { type, content, fileName, mime, timestamp, direction } = message;
  const isIncoming = direction === 'incoming';
  const isAudio = message.type === 'audio';

  const time = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const renderContent = () => {
    if (type === 'text') return <div className={styles.msgText}>{content}</div>;

    if (type === 'file') {
      const dataUrl = `data:${mime};base64,${content}`;
      // provide download link and preview for images
      const isImage = mime.startsWith('image/');
      return (
        <div className={styles.msgFile}>
          {isImage && <img src={dataUrl} alt={fileName} className={styles.filePreview} />}
          <a className={styles.fileLink} href={dataUrl} download={fileName}>
            {fileName}
          </a>
        </div>
      );
    }

    if (type === 'audio') {
      const dataUrl = `data:${mime};base64,${content}`;
      return <VoiceMessage src={dataUrl} />;
    }

    return null;
  };

  return (
    <div className={`${styles.messageItem} ${isIncoming ? styles.incoming : styles.outgoing}`}>
      <div className={clsx(styles.messageBubble, isAudio && styles.audioBubble)}>
        {renderContent()}
        <div className={styles.msgTime}>{time}</div>
      </div>
    </div>
  );
}
