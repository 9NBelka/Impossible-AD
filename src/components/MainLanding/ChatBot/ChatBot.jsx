import scss from './ChatBot.module.scss';

export default function ChatBot() {
  return (
    <div className={scss.iframeChatPosition}>
      <iframe
        src='https://interfaces.zapier.com/embed/chatbot/cmepsdf0a004878k51tyv3aln'
        allow='clipboard-write *'
        className={scss.iframeChat}></iframe>
      <div className={scss.blockWhite}></div>
    </div>
  );
}
