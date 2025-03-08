import "./../App.css"
import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { AppContext } from "../components/ContextAPI";  // Access contex
import { useContext } from "react";
import { useState } from "react";

import ProductForm from "../components/ProductForm"; // Import the new ProductForm component

// The Room component
export default function Room () {

const { rooms, setRooms } = useContext(AppContext);
const navigate = useNavigate(); // Hook for navigation

const { roomName } = useParams(); // Extract room name from the URL

if (!rooms || rooms.length === 0) {
  return <p>Loading rooms...</p>;  // Show loading message while rooms are empty
  }

if (!Array.isArray(rooms)) {
  return <p>Error: Rooms is not an array</p>;
}  
// Find room with roomName 
const currentRoom = rooms.find((room) => room.name === roomName);
const roomType = currentRoom.type;  // Access the type of the current room

// Initialize products and their states
function initializeProducts() {
  if (!currentRoom.products) return [];
  
  return currentRoom.products.map(product => {
    // Keep the existing logic for products that already have a state defined
    if (product.includes(" off")) {
      return {
        name: product.replace(" off", ""),
        isOn: false
      };
    } else {
      // Change default state to off for all products
      return {
        name: product,
        isOn: false
      };
    }
  });
}

  // Handle product addition
  const [showProductForm, setShowProductForm] = useState(false); // Track whether to show the ProductForm
  const [roomProducts, setRoomProducts] = useState(initializeProducts()); // State for room products

  function handleAddProduct(product) {
    if (roomProducts.length >= 5) {
      alert("ERROR: Max 5 products per room");
      return;
    }
  
    if (product === "Stereo" && roomProducts.some((item) => item.name === "Stereo")) {
      alert("ERROR: Only one stereo per room");
      return;
    }
  
    if (product === "Heater" && currentRoom.type !== "Bathroom") {
      alert("ERROR: Heater can only be added to the bathroom");
      return;
    }

  // Add the new product to the room products array with initial state off
  const updatedProducts = [...roomProducts, { name: product, isOn: false }];
  setRoomProducts(updatedProducts);
  
  // Update the global rooms state
  updateGlobalRoomsState(updatedProducts);
  
  setShowProductForm(false); // Hide the product form
  };

  // Helper function to update the global rooms state
  function updateGlobalRoomsState(productsWithState) {
    // Convert the products with state to the format expected by the global state
    const productsForGlobalState = productsWithState.map(product => 
      product.isOn ? product.name : `${product.name} off`
    );
    
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.name === roomName ? { ...room, products: productsForGlobalState } : room
      )
    );
  }

  // Toggle product status (on/off)
  function toggleProductStatus(index) {
    setRoomProducts((prev) => {
      const updatedProducts = prev.map((product, i) => {
        if (i === index) {
          return { ...product, isOn: !product.isOn };
        }
        return product;
      });
      
      // Update the global rooms state
      updateGlobalRoomsState(updatedProducts);
      return updatedProducts;
    });
  }

  // Function to navigate to home page
  function goToHomePage() {
    navigate('/');
  }

  return (
    <div className="text-right">
      <div className="flex flex-row ">
        {/* Product List */}
          <div className="flex flex-col gap-8 mt-2">
            {roomProducts.map((product, index) => (
          
            <button
              onClick={() => toggleProductStatus(index)}
              className={`w-32 h-12 focus:outline-none transition-colors duration-200 ${product.isOn ? 'bg-green-500' : 'bg-red-500'} text-white font-medium overflow-hidden text-ellipsis`}
              aria-label={`Toggle ${product.name} ${product.isOn ? 'off' : 'on'}`}
            >
              {product.name}
            </button>
            ))}
          </div>

          {/* Display Room Name and Room Type */}
          <div className="p-6 text-right">
            <h2 className="text-xl font-semibold mb-2">שם החדר: {currentRoom.name}</h2>
            <h2 className="text-xl font-semibold mb-4">סוג החדר: {roomType}</h2>
          </div>
      </div>

      <div className="flex flex-col mt-8 justify-self-end ">
        {/* Button to show the ProductForm */}
        <button
          onClick={() => setShowProductForm(true)}
          className="mt-2 w-60 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md" 
        >
          <span className="ml-2">הוסף מוצר</span>
        </button>

        {/* Conditionally render the ProductForm */}
        <div className="">
          {showProductForm && (<ProductForm onAddProduct={handleAddProduct} />)}
        </div>

        {/* Home navigation button */}
        <button
          onClick={goToHomePage}
          className="flex-bottom mt-8 w-60 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <span className="ml-2">הבית שלי</span>
        </button>
      </div>
    </div>
  );
};