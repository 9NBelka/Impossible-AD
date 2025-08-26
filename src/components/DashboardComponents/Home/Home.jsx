import scss from './Home.module.scss';

export default function Home() {
  return (
    <div className={scss.mainBlock}>
      <h2>Dashboard</h2>
      <p>Welcome to the admin dashboard!</p>
    </div>
  );
}
