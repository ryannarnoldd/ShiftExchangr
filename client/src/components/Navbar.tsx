import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="navbar">
      <h1 className="logo">ShiftExchangr</h1>
      <ul className="nav-links">
        <li><Link className={pathname === '/' ? 'active' : ''} to="/">Home</Link></li>
      </ul>
    </nav>
  );
}