
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold" aria-label="Blog App Home">Blog App</Link>
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="px-2 py-1 rounded text-black"
                aria-label="Search posts"
              />
              <button type="submit" className="bg-white text-blue-600 px-2 py-1 rounded" aria-label="Search">
                Search
              </button>
            </form>
          )}
          <ul className="flex gap-4">
            {isAuthenticated ? (
              <>
                <li><Link to="/" className="hover:underline" aria-label="Home">Home</Link></li>
                <li><Link to="/profile" className="hover:underline" aria-label="Profile">Profile</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="hover:underline"
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:underline" aria-label="Login">Login</Link></li>
                <li><Link to="/register" className="hover:underline" aria-label="Register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
