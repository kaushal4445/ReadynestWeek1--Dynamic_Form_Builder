import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

function Layout({ children }) {

  const location = useLocation();

  // THEME STATE

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // THEMES
const themes = {
  dark: "bg-slate-950 text-white",
  light: "bg-slate-100 text-black",
  purple: "bg-gradient-to-br from-purple-950 to-indigo-950 text-white",
  emerald: "bg-gradient-to-br from-emerald-950 to-teal-950 text-white",
  rose: "bg-gradient-to-br from-rose-950 to-pink-950 text-white",
};
  useEffect(() => {
    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "My Forms",
      path: "/my-forms",
    },
    {
      name: "Create Form",
      path: "/create-form",
    },
    {
      name: "Responses",
      path: "/responses",
    },
    {
      name: "Analytics",
      path: "/analytics",
    },
  ];


const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");

  navigate("/signup");
};

  return (

    <div
      className={`flex min-h-screen ${themes[theme]}`}
    >

      {/* SIDEBAR */}

      <div className="w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-3xl font-bold mb-10 text-cyan-400">

          Form Builder

        </h1>

        {/* THEME SELECTOR */}

       {/* THEME PICKER */}

<div className="mb-8">

  <p className="text-sm text-slate-400 mb-3">
    Choose Theme
  </p>

  <div className="flex gap-3">

    <button
      onClick={() => setTheme("dark")}
      className={`w-10 h-10 rounded-full bg-slate-900 border-4 transition ${
        theme === "dark"
          ? "border-cyan-400 scale-110"
          : "border-slate-700"
      }`}
    />

    <button
      onClick={() => setTheme("purple")}
      className={`w-10 h-10 rounded-full bg-purple-600 border-4 transition ${
        theme === "purple"
          ? "border-white scale-110"
          : "border-purple-800"
      }`}
    />

    <button
      onClick={() => setTheme("emerald")}
      className={`w-10 h-10 rounded-full bg-emerald-500 border-4 transition ${
        theme === "emerald"
          ? "border-white scale-110"
          : "border-emerald-800"
      }`}
    />

    <button
      onClick={() => setTheme("rose")}
      className={`w-10 h-10 rounded-full bg-rose-500 border-4 transition ${
        theme === "rose"
          ? "border-white scale-110"
          : "border-rose-800"
      }`}
    />

    <button
      onClick={() => setTheme("light")}
      className={`w-10 h-10 rounded-full bg-white border-4 transition ${
        theme === "light"
          ? "border-cyan-400 scale-110"
          : "border-slate-400"
      }`}
    />

  </div>

</div>

        {/* MENU */}

        <div className="space-y-3">

          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`block px-5 py-3 rounded-xl font-semibold transition ${
                location.pathname === item.path
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {item.name}
            </Link>

          ))}

        </div>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="w-full mt-10 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

      {/* CONTENT */}

      <div className="flex-1 p-8 overflow-y-auto">

        {children}

      </div>

    </div>

  );
}

export default Layout;