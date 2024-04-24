import { useState } from "react";
import { useSelector } from "react-redux";

export default function ModalSelectSpec({ close, onChange }) {
  const [search, setSearch] = useState("");

  const specializationTypes = useSelector(state => state.vacancy.specializations)
  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={close}></div>
      <div className="modal-inner">
        <h2>Кого вы хотите найти?</h2>

        <input
          className="input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        
      </div>
    </div>
  );
}
