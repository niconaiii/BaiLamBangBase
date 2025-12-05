import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState("");

  useEffect(() => {
    const getTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/tours/${id}`);
        setName(data.name);
        setCategory(data.category);
        setDestination(data.destination);
        setDuration(data.duration);
        setPrice(data.price);
        setImage(data.image);
        setDescription(data.description);
        setAvailable(data.available);
      } catch (error) {
        toast.error("Lỗi API");
      }
    };
    getTour();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/tours/${id}`, {
        name,
        price: Number(price),
        category,
        destination,
        duration,
        image,
        description,
        available: Number(available),
      });
      toast.success("Cap nhat  tour thanh cong");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Cập nhật Tour ID: {id}</h1>

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
              --- Chọn danh mục ---
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
    Cập nhật
        </button>
      </form>
    </div>
  );
}

export default EditPage;
