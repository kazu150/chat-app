import Router from 'next/router';

const signin = () => {
  const onSigninSubmit = (e) => {
    e.preventDefault();
    Router.push('/chat');
  };
  return (
    <div>
      <h1>サインイン</h1>
      <form onSubmit={onSigninSubmit}>
        <input placeholder="example@example.com" />
        <input type="password" placeholder="●●●●●●●●" />
        <input type="submit" value="送信する" />
      </form>
    </div>
  );
};

export default signin;
