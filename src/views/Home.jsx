import "./../App.css"

import { Link, useNavigate } from 'react-router-dom';
import { IoAdd } from "react-icons/io5";
import React, { useContext } from "react";
import { AppContext } from "../components/ContextAPI";

export default function Home() {
  const navigate = useNavigate();
  const { rooms } = useContext(AppContext); // ✅ Get rooms from context

  return (
    <div className="flex flex-col p-6 text-center">
      {/* Room List */}
      <div className="mt-4 grid grid-cols-3 gap-4 mb-8"> {/* Added mb-8 for spacing */}
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <Link
              key={index}
              to={`/room/${room.name}`}
              className="p-6 text-white rounded-lg text-xl"
              style={{ backgroundColor: room.color }}
            >
              {room.name}
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No rooms added yet.</p>
        )}
      </div>

      <button
          className="bg-blue-500 p-2 rounded-full mx-auto flex items-center justify-center w-12 h-12"
          onClick={() => navigate("/addroom")}
          aria-label="Add Room"
          >
          <IoAdd size={40} className="text-black" />
      </button>

      </div>
  );
}