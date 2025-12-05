import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

function AddPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState("");

  const validateData = () => {
    if (!name) {
      return "Vui lòng nhập tên tour";
    }
    if (!category) {
      return "Vui lòng chọn danh mục tour";
    }
    if (!destination) {
      return "Vui lòng nhập điểm đến tour";
    }
    if (!duration) {
      return "Vui lòng nhập thời lượng tour";
    }
    const priceNum = Number(price);
    if (!price || isNaN(priceNum) || priceNum <= 0) {
      return "Vui lòng nhập giá lớn hơn 0";
    }
    if (!image) {
      return "Vui lòng nhập ảnh tour";
    }
    if (!description || description.trim() === "") {
      return "Vui lòng nhập miêu tả tour";
    }
    if (description.length < 10) {
      return "Vui lòng nhập miêu tả dài hơn (tối thiểu 10 ký tự)";
    }
    if (description.length > 1000) {
      return "Vui lòng nhập miêu tả ngắn hơn (tối đa 1000 ký tự)";
    }
    const availableNum = Number(available);
    if (!available || isNaN(availableNum)) {
      return "Vui lòng nhập số lượng tour còn lại";
    }
    if (availableNum < 0) {
      return "Vui lòng nhập số lượng tour lớn hơn 0";
    }
    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validateData();
    if (message) {
      toast.error(message);
      return;
    }
    try {
      await axios.post("http://localhost:3000/tours", {
        name,
        price: Number(price),
        category,
        destination,
        duration,
        image,
        description,
        available: Number(available),
      });
      toast.success("Them tour thanh cong");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm mới</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Tên Tour
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Điểm đến
          </label>
          <input
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Thời gian
          </label>
          <input
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            type="text"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Giá
          </label>
          <input
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            type="number"
            id="price"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Ảnh
          </label>
          <input
            value={image}
            onChange={(event) => setImage(event.target.value)}
            type="text"
            id="image"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Miêu tả
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            id="description"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="available" className="block font-medium mb-1">
            Số lượng
          </label>
          <input
            value={available}
            onChange={(event) => setAvailable(event.target.value)}
            type="number"
            id="available"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Select */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Chọn Tour
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            id="category"
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              --- Chọn Danh mục ---
            </option>
            <option value="1">Tour nội địa</option>
            <option value="2">Tour ngoại quốc</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm
        </button>
      </form>
    </div>
  );
}

export default AddPage;
