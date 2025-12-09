import React, { useRef, useState, useEffect } from 'react';
import ChatModal from '../ChatModal/ChatModal';
import styles from '../ChatImpossibleAD.module.scss';
import { BsChatDots } from 'react-icons/bs';

export default function ChatButton() {
  const btnRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);

  useEffect(() => {
    function onResize() {
      if (btnRef.current) setAnchorRect(btnRef.current.getBoundingClientRect());
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggle = () => {
    if (!open && btnRef.current) setAnchorRect(btnRef.current.getBoundingClientRect());
    setOpen((prev) => !prev);
  };

  return (
    <>
      <button ref={btnRef} className={styles.floatingBtn} onClick={toggle} aria-label='Open chat'>
        <BsChatDots className={styles.iconChat} />
      </button>

      {open && anchorRect && <ChatModal anchorRect={anchorRect} onClose={() => setOpen(false)} />}
    </>
  );
}
