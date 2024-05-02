"use client";
import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getSpecializations } from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
import AutoCompliteSelect from "@/components/AutoCompliteSelect";
export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const [cityId, setCity] = useState();
  const [salary_from, setSalaryFrom] = useState("");
  const [salary_to, setSalaryTo] = useState("");
  const [salary_type, setSalaryType] = useState("");



  const dispatch = useDispatch();
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
  }, []);

  const handleOnSpecChange = (e) => {
    setSpecializationId(e.target.value * 1);
  };

  const cities = useSelector((state) => state.vacancy.cities);

  return (
    <main>
      <Header />
      <div className="container p7">
        <h1>Создание вакансии</h1>

        <h2>Основная информация</h2>

        <fieldset className="fieldset-vertical">
          <label>Название вакансии</label>
          <input
            className="input"
            placeholder="Название"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset-vertical">
          <label>Указать специализацию</label>
          <p className="link" onClick={() => setSpecModalOpen(true)}>
            Указать специализацию
          </p>
        </fieldset>

        {isSpecModalOpen && (
          <ModalSelectSpec
            close={closeSpecModal}
            onChange={handleOnSpecChange}
            value={specializationId}
          />
        )}

        <AutoCompliteSelect
          placeholder=""
          type="text"
          label="Город проживания"
          size="fieldset-md fieldset-vertical"
          items={cities}
          onSelect={(data) => setCity(data.id)}
        />

        <fieldset className="fieldset-vertical fieldset-md">
          <label>Предпологаемый уровень дохода в месяц</label>
          <div className="input-group">
          <input
            className="input"
            placeholder="От"
            value={salary_from}
            type="text"
            onChange={(e) => setSalaryFrom(e.target.value)}
          />
          <input
            className="input"
            placeholder="До"
            value={salary_to}
            type="text"
            onChange={(e) => setSalaryTo(e.target.value)}
          /> 
          <select className="input" name="salary_type" value={salary_type} onChange={e=>setSalaryType(e.target.value)}>
            <option value={"KZT"}>KZT</option>
            <option value={"USD"}>USD</option>
            <option value={"RUB"}>RUB</option>

          </select>
          </div>
        </fieldset>
        
      </div>
    </main>
  );
}
