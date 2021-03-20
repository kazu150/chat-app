import Link from 'next/link';
import { NextPage } from 'next';

const chats: NextPage = () => {
  const onAddChatRoom = () => {
    console.log('added!');
  };

  return (
    <div>
      <Link href="/chats/test1">チャットルーム ほげほげ</Link>
      <Link href="/chats/test2">チャットルーム ぽよぽよ</Link>
      <Link href="/chats/test3">チャットルーム ぴよぴよ</Link>
      <Link href="/chats/test4">チャットルーム ふかふか</Link>
      <div onClick={onAddChatRoom}>チャットルームを追加</div>
    </div>
  );
};

export default chats;
