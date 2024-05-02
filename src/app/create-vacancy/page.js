"use client";
import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/header";
import { useDispatch } from "react-redux";
import { getSpecializations } from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const dispatch = useDispatch();
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
  }, []);

  const handleOnSpecChange = (e) => {
    setSpecializationId(e.target.value * 1);
  };
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
          label="Гражданство"
          size="fieldset-md"
          items={countries}
          onSelect={(data) => setCitizenship(data.id)}
        />
      </div>
    </main>
  );
}
