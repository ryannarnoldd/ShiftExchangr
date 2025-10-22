import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h1 className="logo">ShiftTrack</h1>
      <ul className="nav-links">
        <li><Link className={pathname === '/' ? 'active' : ''} to="/">Home</Link></li>
        <li><Link className={pathname === '/add' ? 'active' : ''} to="/add">Add Shift</Link></li>
        <li><Link className={pathname === '/profile' ? 'active' : ''} to="/profile">Profile</Link></li>
        <li><Link className={pathname === '/about' ? 'active' : ''} to="/about">About</Link></li>
      </ul>
    </nav>
  );
}
