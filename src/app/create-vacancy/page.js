"use client";
import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getSpecializations,
  getExperiences,
  setExperiences,
} from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
import AutoCompliteSelect from "@/components/AutoCompliteSelect";
export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const [cityId, setCity] = useState();
  const [address, setAddress] = useState();
  const [salary_from, setSalaryFrom] = useState("");
  const [salary_to, setSalaryTo] = useState("");
  const [salary_type, setSalaryType] = useState("");
  const [experienceId, setExperienceId] = useState();

  const dispatch = useDispatch();
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExperiences());
  }, []);

  const handleOnSpecChange = (e) => {
    setSpecializationId(e.target.value * 1);
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const handleChangeExp = (e) => {
    setExperienceId[e.target.value];
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
            value={name}
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
            <select
              className="input"
              name="salary_type"
              value={salary_type}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value={"KZT"}>KZT</option>
              <option value={"USD"}>USD</option>
              <option value={"RUB"}>RUB</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="fieldset-vertical">
          <label>Адресс</label>
          <input
            className="input"
            placeholder="Введите адрес"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset-vertical fieldset-md">
          <label>Опыт работы</label>
          <div>
            {experiences.map((exp) => (
              <div className="radio">
                <input type="radio" value={exp.id} name="exp" onChange={handleChangeExp} />
                <label>{exp.duration}</label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </main>
  );
}
