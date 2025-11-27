import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop View (sm and above) */}
          <div className="hidden sm:flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold">🍳</span>
              <h1 className="text-2xl font-bold">Recipe Book</h1>
            </Link>
            
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link 
                    to="/" 
                    className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all"
                  >
                    Home
                  </Link>
                  <Link 
                    to="/add-recipe" 
                    className="bg-white text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    + Add Recipe
                  </Link>
                  <div className="text-sm">
                    <p className="text-white">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile View Header (below sm) */}
          <div className="sm:hidden flex justify-between items-center py-3">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">🍳</span>
              <h1 className="text-lg font-bold">Recipe Book</h1>
            </Link>
            {currentUser && (
              <div className="text-xs text-white">
                <p>{currentUser.email}</p>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Footer Navigation (below sm) - Fixed at bottom */}
      <footer className="sm:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
        <div className="flex justify-around items-center px-4 py-3 gap-2">
          <Link 
            to="/" 
            className="flex-1 text-center text-white hover:bg-white hover:bg-opacity-20 px-2 py-2 rounded-lg transition-all text-sm font-medium"
          >
            Home
          </Link>
          <Link 
            to="/add-recipe" 
            className="flex-1 text-center bg-white text-orange-600 font-semibold px-2 py-2 rounded-lg hover:bg-gray-100 transition-all text-sm"
          >
            + Add
          </Link>
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-lg transition-all text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="flex-1 text-center text-white hover:bg-white hover:bg-opacity-20 px-2 py-2 rounded-lg transition-all text-sm font-medium"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      </footer>

      {/* Add padding to main content so it doesn't get hidden behind footer on mobile */}
      <style>{`
        @media (max-width: 640px) {
          body {
            padding-bottom: 60px;
          }
        }
      `}</style>
    </>
  );
}