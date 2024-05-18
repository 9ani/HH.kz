"use client";
import { useState } from "react";
import { useEffect } from "react";

import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getSpecializations,
  getExperiences,
  getSkills,
  getEmpType,
  createVacancy,
} from "@/app/store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
import AutoCompliteSelect from "@/components/AutoCompliteSelect";
import { useRouter } from "next/navigation";
export default function SearchVacancyAdvanced() {
  const [q, setQ] = useState("");
  const [specializationId, setSpecializationId] = useState();
  const [specializationName, setSpecializationName] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const [cityId, setCity] = useState();
  const [salary, setSalary] = useState("");
  const [salary_type, setSalaryType] = useState("");
  const [experienceId, setExperienceId] = useState();
  const [employmentTypeId, setEmploymentTypes] = useState();


  const router = useRouter();

  const dispatch = useDispatch();
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExperiences());
    dispatch(getSkills());
    dispatch(getEmpType());
  }, []);

  const handleOnSpecChange = (e) => {
    setSpecializationName(e.target.dataset.name);
    setSpecializationId(e.target.value * 1);
    closeSpecModal();
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const empTypes = useSelector((state) => state.vacancy.empTypes);

  const handleChangeExp = (e) => {
    setExperienceId[e.target.value];
  };

  const handleSearch = () => {
    let queryString = "?";
    if (q) queryString += `q=${q}&`;
    if(specializationId) queryString += `specializationId=${specializationId}&`
    if(cityId) queryString += `cityId=${cityId}&`
    if(salary) queryString += `salary=${salary}&`
    if(salary_type) queryString += `salary_type=${salary_type}&`
    if(experienceId) queryString += `experienceId=${experienceId}&`
    if(employmentTypeId) queryString += `employmentTypeId=${employmentTypeId}&`

    router.push(`/search/vacancy?${queryString}`);
  };
  return (
    <main>
      <Header />
      <div className="container p7">
        <h1>Поиск вакансии</h1>

        <fieldset className="fieldset-vertical">
          <label>Ключевые слова</label>
          <input
            className="input"
            placeholder="Название"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset-vertical">
          <label>Указать специализацию</label>
          {specializationName && <p>{specializationName}</p>}
          <p className="link" onClick={() => setSpecModalOpen(true)}>
            Указать специализацию
          </p>
        </fieldset>

        {isSpecModalOpen && (
          <ModalSelectSpec
            close={closeSpecModal}
            onChange={handleOnSpecChange}
            value={specializationId * 1}
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
              value={salary}
              type="text"
              onChange={(e) => setSalary(e.target.value)}
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

        <fieldset className="fieldset-vertical fieldset-md">
          <label>Опыт работы</label>
          <div>
            {experiences.map((exp) => (
              <div className="radio" key={exp.id}>
                <input
                  type="radio"
                  value={exp.id}
                  name="exp"
                  onChange={handleChangeExp}
                />
                <label>{exp.duration}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="fieldset-vertical fieldset-md">
          <label>Тип занятости</label>
          <div>
            {empTypes.map((et) => (
              <div className="radio" key={et.id}>
                <input
                  type="radio"
                  value={et.id}
                  name="empType"
                  onChange={(e) => setEmploymentTypes(e.target.value)}
                />
                <label>{et.name}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <button className="button button-primary" onClick={handleSearch}>
          Поиск
        </button>
      </div>
    </main>
  );
}
