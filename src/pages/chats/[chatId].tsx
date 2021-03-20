import { useRouter } from 'next/router';
import { NextPage } from 'next';

const Chat: NextPage = () => {
  const router = useRouter();
  return <div>{router.query.chatId}</div>;
};

export default Chat;
