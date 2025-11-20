import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../../../../axios/axios.config.js";
import toast from "react-hot-toast";
import { StockContext } from "../../../../stockContext/StockContext.jsx";

// Confirm Modal Component
const ConfirmModal = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-80 sm:w-96 text-gray-100 shadow-lg">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function EditSale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refetchSaleList } = useContext(StockContext);

  const [sale, setSale] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [data, setData] = useState({
    name: "",
    quantity: "",
    seller: "",
    date: "",
  });

  // Fetch sale by ID
  const getSaleById = async () => {
    if (fetching) return;
    try {
      setFetching(true);
      const res = await Axios.get(`/api/sale/${id}`);
      if (res.data.success) {
        setSale(res.data.data);
      } else {
        toast.error("Failed to fetch sale details.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error fetching sale.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) getSaleById();
  }, [id]);

  useEffect(() => {
    if (sale) {
      setData({
        name: sale.item?.name || "",
        quantity: sale.quantity || "",
        seller: sale.seller || "",
        date: sale.date ? new Date(sale.date).toISOString().split("T")[0] : "",
      });
    }
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Update sale handler
  const updateHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const payload = {
        itemName: data.name,
        quantity: data.quantity,
        seller: data.seller,
        date: data.date,
      };
      const res = await Axios.put(`/api/sale/${id}`, payload);
      if (res.data.success) {
        toast.success("Sale updated successfully!");
        await refetchSaleList();
        navigate("/dashboard/sales");
      } else {
        toast.error(res.data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Delete sale handler
  const deleteHandler = async () => {
    if (loading) return;
    setShowDeleteModal(false);
    setLoading(true);
    try {
      const res = await Axios.delete(`/api/sale/${id}`);
      if (res.data.success) {
        toast.success("Sale deleted successfully!");
        await refetchSaleList();
        navigate("/dashboard/sales");
      } else {
        toast.error(res.data.message || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Deletion error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching && !sale) {
    return (
      <div className="p-6 text-center text-gray-200 bg-gray-800 rounded-xl">
        Loading sale details...
      </div>
    );
  }

  return (
    <div className="w-full h-auto py-12 bg-gray-50">
      <div className="p-6 bg-gray-800 shadow-2xl border border-gray-400 rounded-2xl max-w-xl mx-auto my-12 xl:mr-[41.5vw]">
        <h1 className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-6">
          <span className="text-[1.5rem] sm:text-[2rem] font-extrabold text-gray-100">
            Edit Sale
          </span>
          <span className="w-20 sm:w-30 h-1 mt-2 sm:mt-4 bg-gray-600 rounded-full"></span>
        </h1>

        <form className="flex flex-col gap-4" onSubmit={updateHandler}>
          {/* Item Name */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Enter item name"
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
              disabled={loading || fetching}
            />
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              placeholder="Enter quantity sold"
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              required
              min="0"
              disabled={loading || fetching}
            />
          </div>

          {/* Seller */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Seller
            </label>
            <input
              type="text"
              name="seller"
              value={data.seller}
              placeholder="Enter seller name"
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              disabled={loading || fetching}
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-gray-100 font-semibold mb-1 text-sm sm:text-base md:text-lg">
              Sale Date
            </label>
            <input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              disabled={loading || fetching}
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
              disabled={loading || fetching}
            >
              {loading ? "Updating..." : "Update Sale"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition disabled:bg-red-400"
              disabled={loading || fetching}
            >
              {loading ? "Deleting..." : "Delete Sale"}
            </button>
          </div>
        </form>

        {/* Delete confirmation modal */}
        <ConfirmModal
          open={showDeleteModal}
          message="Are you sure you want to delete this sale record?"
          onConfirm={deleteHandler}
          onCancel={() => setShowDeleteModal(false)}
        />
      </div>
    </div>
  );
}

export default EditSale;
