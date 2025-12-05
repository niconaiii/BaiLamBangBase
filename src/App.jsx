import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import AddPage from "../src/pages/Add";
import ListPage from "../src/pages/List";
import EditPage from "../src/pages/Edit";
import RegisterPage from "../src/pages/register";
import LoginPage from "./pages/login";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER - Navbar Tailwind */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </Link>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          {/* Right menu desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/login" className="hover:text-gray-200">
              Đăng nhập
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <Routes>
          <Route element={<AdminLayout />}>
            <Route path="/list" element={<ListPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
