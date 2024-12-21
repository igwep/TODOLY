// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/UseAuth';

export const Settings = ({ updateUser, updateCategories }) => {
const { user } = useAuthContext();
const [categories, setCategories] = useState(user?.categories || []);
const [newCategory, setNewCategory] = useState("");
const [activeTab, setActiveTab] = useState("Categories");

  const navigate = useNavigate();

  const handleCategoryAdd = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory]);
      setNewCategory("");
    }
  };

  const handleCategoryRemove = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "Account Info") {
      navigate("/profile");
    }
  };

  const handleSave = () => {
    updateCategories(categories);
    alert("Categories updated successfully!");
  };

  return (
    <div className='tablet:pl-[25vw] pt-32 py-8 h-screen bg-gray-100 px-8 w-[100%]'>
 <div className="bg-gray-100 text-gray-900 p-4 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 pb-2 mb-4">
        <button
          className={`text-lg font-semibold ${
            activeTab === "Categories"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("Categories")}
        >
          Categories
        </button>
        <button
          className={`text-lg font-semibold ${
            activeTab === "Account Info"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("Account Info")}
        >
          Account Info
        </button>
      </div>

      {/* Categories Tab Content */}
      {activeTab === "Categories" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Manage Categories</h2>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
              className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md"
            />
            <button
              onClick={handleCategoryAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white px-3 py-2 rounded-md border border-gray-300"
              >
                <span>{category}</span>
                <button
                  onClick={() => handleCategoryRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="w-full py-2 bg-customColor text-white rounded-md hover:bg-lighterCustomColor"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>

    </div>
  )
}
