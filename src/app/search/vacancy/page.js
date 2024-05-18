"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  getCities,
  getSpecializations,
  getExperiences,
  getSkills,
  getEmpType,
  getSearchedVacancies,
} from "@/app/store/slices/vacancySlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ModalSelectSpec from "@/components/ModalSelectSpec";
import AutoCompliteSelect from "@/components/AutoCompliteSelect";
import MyVacancies from "@/components/myvacancies";
import Vacancy from "@/app/vacancy/page";
import { useRouter } from "next/navigation";
export default function SearchVacancy() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter()
  const [q, setQ] = useState(searchParams.get("q"));
  const [specializationId, setSpecializationId] = useState(
    searchParams.get("specializationId")
  );
  const [cityId, setCity] = useState(searchParams.get("cityId"));
  const [experienceId, setExperienceId] = useState(
    searchParams.get("experienceId")
  );
  const [employmentTypeId, setEmploymentTypes] = useState(
    searchParams.get("employmentTypeId")
  );
  const [salary, setSalary] = useState(searchParams.get("salary"));
  const [salary_type, setSalaryType] = useState(
    searchParams.get("salary_type")
  );
  const [specializationName, setSpecializationName] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  const handleOnSpecChange = (e) => {
    setSpecializationName(e.target.dataset.name);
    setSpecializationId(e.target.value * 1);
    closeSpecModal();
  };

  const handleSearch = () => {
    dispatch(
      getSearchedVacancies(
        {
          q,
          specializationId,
          cityId,
          experienceId,
          employmentTypeId,
          salary,
          salary_type,
        },
        router
      )
    );
  };

  useEffect(handleSearch, [
    specializationId,
    cityId,
    employmentTypeId,
    salary,
    salary_type,
    experienceId,
  ]);
  useEffect(() => {
    handleSearch();
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExperiences());
    dispatch(getSkills());
    dispatch(getEmpType());
  }, []);

  const handleChangeExp = (e) => {
    setExperienceId[e.target.value];
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const empTypes = useSelector((state) => state.vacancy.empTypes);
  return (
    <main>
      <Header />
      <div className="container mt7">
        <div className="flex">
          <fieldset className="fieldset-vertical pt7" style={{ width: `100%` }}>
            <input
              className="input"
              placeholder="Название"
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </fieldset>
          <button className="button button-primary" onClick={handleSearch}>
            Найти
          </button>
        </div>

        <div className="flex">
          <div style={{ width: `20%` }}>
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
          </div>
          <div style={{ width: `80%`, paddingLeft: `40px` }}>
            <MyVacancies />
          </div>
        </div>
      </div>
    </main>
  );
}
