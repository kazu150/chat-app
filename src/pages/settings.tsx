import Router from 'next/router';

const settings = () => {
  const onSettingsSubmit = (e) => {
    e.preventDefault();
    alert('done!');
  };
  return (
    <div>
      <h1>設定</h1>
      <form onSubmit={onSettingsSubmit}>
        <input />
        <input type="submit" value="更新" />
      </form>
      <button onClick={() => Router.push('/chat')}>チャットへ</button>
    </div>
  );
};

export default settings;
