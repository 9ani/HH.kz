"use client";
import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/header";
import { useDispatch } from "react-redux";
import { getSpecializations } from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const dispatch = useDispatch();
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
  }, []);
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
            onChange={(spec) => setSpecialization(spec)}
          />
        )}
      </div>
    </main>
  );
}
