import Router from 'next/router';

const chat = () => {
  const onPostSubmit = (e) => {
    e.preventDefault();
    alert('done');
  };

  return (
    <div>
      <ul>
        <li>
          <div>
            <img href="" />
            <p>username</p>
          </div>
          <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
        </li>
        <li>
          <div>
            <img href="" />
            <p>username</p>
          </div>
          <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
        </li>
        <li>
          <div>
            <img href="" />
            <p>username</p>
          </div>
          <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
        </li>
        <li>
          <div>
            <img href="" />
            <p>username</p>
          </div>
          <p>本文本文本文本文本文本文本文本文本文本文本文本文</p>
        </li>
      </ul>
      <form onSubmit={onPostSubmit}>
        <input placeholder="投稿内容を入力しましょう" />
        <input type="submit" value="投稿する" />
      </form>
    </div>
  );
};

export default chat;
