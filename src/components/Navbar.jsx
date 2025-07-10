import { useState } from "react";
import { FaBars, FaTimes, FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();

  const newsItems = [
    { id: 1, newsName: "Fox News", path: "fox-news" },
    { id: 2, newsName: "The Hindu", path: "the-hindu" },
    { id: 3, newsName: "BBC", path: "bbc-news" },
    { id: 4, newsName: "The Verge", path: "the-verge" },
    { id: 5, newsName: "Times Of India", path: "the-times-of-india" },
  ];

  const handleSearch = () => {
    if (user && query.trim()) {
      navigate(`/search/${query}`);
      setQuery("");
    } else {
      navigate("/login");
    }
  };

  const handleLogin = () => navigate("/login");
  const handleUserProfile = () => navigate("/profile");

  return (
    <nav className="bg-orange-500 sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="hover:bg-orange-700/40 px-3 py-2 rounded-full transition text-xl font-bold text-white"
        >
          The Rise
        </Link>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex gap-7 text-white font-semibold text-base">
          {newsItems.map((item) => (
            <li
              key={item.id}
              className="cursor-pointer relative px-1 transition"
              onClick={() =>
                user ? navigate(`/source/${item.path}`) : navigate("/login")
              }
            >
              <span className="hover:underline underline-offset-8 decoration-2 decoration-orange-100 transition-all duration-200">
                {item.newsName}
              </span>
            </li>
          ))}
        </ul>

        {/* Search & Profile - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* Search */}
          <div className="flex bg-white rounded-md overflow-hidden border border-white">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 outline-none text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-orange-600 text-white px-3 hover:bg-orange-700"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>

          {/* Profile */}
          {user ? (
            <div className="relative group">
              <div
                onClick={handleUserProfile}
                className="flex items-center gap-2 cursor-pointer hover:bg-orange-700/40 px-3 py-2 rounded-full transition"
                title="Profile"
              >
                <div className="bg-orange-200 text-orange-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow">
                  {userProfile?.firstName?.[0]?.toUpperCase() || <FaUser />}
                </div>
                <span className="text-sm whitespace-nowrap text-white font-bold">
                  Hello, {userProfile.firstName}
                </span>
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-36 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200 z-50">
                <div
                  onClick={handleUserProfile}
                  className="block px-4 py-2 text-sm text-orange-700 hover:bg-orange-100 cursor-pointer"
                >
                  View Profile
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-sm px-4 py-1.5 rounded-full bg-white text-orange-600 font-semibold hover:bg-orange-100 shadow transition"
              >
                Login
              </button>
              <span className="text-sm whitespace-nowrap text-white font-bold">
                Welcome User
              </span>
            </>
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-orange-400 text-white">
          <ul className="flex flex-col gap-2">
            {newsItems.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  user ? navigate(`/source/${item.path}`) : navigate("/login");
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:text-orange-100"
              >
                {item.newsName}
              </li>
            ))}
          </ul>

          {/* Mobile Search */}
          <div className="flex border border-white rounded-md overflow-hidden bg-white">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1 outline-none text-black"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-orange-600 text-white px-3 hover:bg-orange-700"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>

          {/* Mobile Profile/Login */}
          {user ? (
            <div
              onClick={handleUserProfile}
              className="flex items-center gap-2 cursor-pointer hover:text-orange-100"
            >
              <FaUser />
              <span>Hello, {userProfile.firstName}</span>
            </div>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-sm px-3 py-1 rounded-md bg-white text-orange-600 font-semibold hover:bg-orange-100"
              >
                Login
              </button>
              <span>Welcome User</span>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
