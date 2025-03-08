import "./../App.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../components/ContextAPI";
import { useContext } from "react";

export default function AddRoom() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#9fc5e8");
  const [type, setType] = useState("חדר שינה");
  const navigate = useNavigate();
  const { rooms, setRooms } = useContext(AppContext);

  
  const handleCreate = () => {
    if (!name.trim()) {
      alert("ERROR: Room name cannot be empty!");
      return;
    }
    const newRoom = {
      id: rooms.length + 1, // Generate a unique ID
      name,
      color,
      type
    };
  
    setRooms([...rooms, newRoom]); // Update the rooms state
    
    if (!Array.isArray(rooms)) {
      alert("ERROR: Rooms is not an array!");
      return;
    }  
  
    navigate("/"); // Redirect to home after adding
  }
  
  return (
    <div className="flex-row justify-center p-6 text-left">
        <select className="p-2 border rounded w-80" onChange={(e) => setType(e.target.value)}>
          <option>חדר שינה</option>
          <option>חדר אמבטיה/שירותים</option>
          <option>מטבח</option>
        </select>

        <input
          type="text"
          className="block p-2 border mt-2 w-80 "
          placeholder="שם החדר (עד 9 תווים)"
          maxLength={9}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-center  mt-2 ">
          <input 
            type="color" 
            className="ml-4 " 
            value={color}
            onChange={(e) => setColor(e.target.value)} 
          />
          <label className="ml-2">בחר צבע חדר </label>
        </div>
        
        <div className="flex justify-center">
        <button onClick={handleCreate} className="text-2xl font-bold mt-4 bg-blue-600 px-4 py-2 rounded w-80">
          צור
        </button>
        </div>
      </div>
  );
}


