import Router from 'next/router';

const signup = () => {
  const onSignupSubmit = (e) => {
    e.preventDefault();
    Router.push('/settings');
  };
  return (
    <div>
      <form onSubmit={onSignupSubmit}>
        <input placeholder="example@example.com" />
        <input type="password" placeholder="●●●●●●●●" />
        <input type="password" placeholder="●●●●●●●●" />
        <input type="submit" value="送信する" />
      </form>
    </div>
  );
};

export default signup;
