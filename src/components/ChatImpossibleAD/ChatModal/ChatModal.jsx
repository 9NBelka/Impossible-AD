import React, { useEffect, useRef } from 'react';
import ChatWindow from '../ChatWindow/ChatWindow';
import styles from '../ChatImpossibleAD.module.scss';

export default function ChatModal({ anchorRect, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  const style = {};
  const width = 340;
  const height = 440;
  const gap = 8;

  if (anchorRect) {
    const left = Math.max(8, anchorRect.left + anchorRect.width / 2 - width / 2);
    const top = anchorRect.top - height - gap;
  }

  return (
    <div className={styles.modalOverlay}>
      <div
        ref={modalRef}
        className={styles.chatModal}
        style={style}
        role='dialog'
        aria-modal='true'>
        <ChatWindow onClose={onClose} />
      </div>
    </div>
  );
}
