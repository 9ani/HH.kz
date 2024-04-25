import { useState } from "react";
import { useSelector } from "react-redux";
import SpecType from "./SpecType";

export default function ModalSelectSpec({ close, onChange, value }) {
  const [search, setSearch] = useState("");
  // const vacancyState = useSelector((state) => state.vacancy);
  // console.log("Vacancy state:", vacancyState); // Verify the state structure
  // const specializationTypes = vacancyState?.specializations || [];

  const specializationTypes = useSelector(
    (state) => state.vacancy.specializations
  );
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
        {specializationTypes.map((specType) => (
          <SpecType key={specType.id} specType={specType} onChange={onChange} value={value}
           />
        ))}
      </div>
    </div>
  );
}
