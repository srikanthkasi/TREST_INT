import React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Header = () => {
  /*const { authState, oktaAuth } = useOktaAuth();

  const handleLogin = () => oktaAuth.signInWithRedirect();
  const handleLogout = () => oktaAuth.signOut();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">MyApp</Link>
      <div>
        {authState?.isAuthenticated ? (
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        ) : (
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        )}
      </div>
    </nav>
  );*/
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">MyApp</Link>
      <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
      <Link className="navbar-brand" to="/TAAccountAdmin">Account Administration</Link>
      <Link className="navbar-brand" to="/TokenReport">Reports</Link>
    </nav>
  );
};

export default Header;
