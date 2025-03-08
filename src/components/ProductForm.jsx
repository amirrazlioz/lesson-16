import React, { useState } from "react";

import "./../App.css"
import "./../index.css"



// ProductForm Component
const ProductForm = ({ roomName, roomType, onAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState(""); // State to manage selected product

  const handleSubmit = () => {
    if (selectedProduct === "") {
      alert("ERROR: Please select a product");
      return;
    }
    
    onAddProduct(selectedProduct);  // Call the onAddProduct function from parent to add product
    setSelectedProduct("");  // Clear the form
  };

  return (
    <div className="mt-4">
      {/* Product Selection */}
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">בחר מוצר</option>
        <option value="מזגן">מזגן</option>
        <option value="דוד">דוד</option>
        <option value="מערכת סטריאו">מערכת סטריאו</option>
        <option value="מנורה">מנורה</option>
      </select>
      
      {/* Add Button */}
      <button
        onClick={handleSubmit}
        className="ml-4 bg-green-500 px-4 py-2 rounded text-white"
      >
        הוסף
      </button>
    </div>
  );
};

export default ProductForm;
