import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";


function ListPage() {
  const [tours, setTours] = useState([]);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const getTours = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/tours");
        setTours(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getTours();
  }, []);

  const cateName = (categoryId) => {
    if (categoryId === "1") {
      return "Tour nội địa";
    } else if (categoryId === "2") {
      return "Tour ngoại quốc";
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Delete")) {
      try {
        await axios.delete("http://localhost:3000/tours/" + id);
        setTours(tours.filter((tour) => tour.id !== id));
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleSearch = () => {
    if (keyword) {
      const data = tours.filter((tour) =>
        tour.name.toLowerCase().includes(keyword.toLocaleLowerCase())
      );
      setTours(data);
    }
    
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách</h1>
      <div className="my-2 flex">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          id="text"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-emerald-600">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Tên Tour
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Điểm đến
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Thời gian
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Giá
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Ảnh
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Miêu tả
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Số lượng
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Danh mục
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{tour.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.destination}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.duration}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.price}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.image}
                </td>
                <td className="px-4 py-2 border border-gray-300 overflow-hidden whitespace-nowrap max-w-2.5 truncate">
                  {tour.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {tour.available}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {cateName(tour.category)}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <Link
                    to={`/edit/${tour.id}`}
                    className="rounded-2xl px-2 border-0 bg-blue-500 text-white py-1 mx-1"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="rounded-2xl px-2 border-0 hover:bg-black bg-red-500 text-white py-1 mx-1"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPage;
