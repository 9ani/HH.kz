"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "@/components/header";
import {
  getCities,
  getSpecializations,
  getExperiences,
  getSkills,
  getEmpType,
  createVacancy,
} from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
import AutoCompliteSelect from "@/components/AutoCompliteSelect";
import AutoCompliteTags from "@/components/AutoCompliteTags";
import { useRouter } from "next/navigation";

export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [specializationName, setSpecializationName] = useState("");
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const [cityId, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [salary_from, setSalaryFrom] = useState("");
  const [salary_to, setSalaryTo] = useState("");
  const [skills, setSelectedSkills] = useState([]);
  const [salary_type, setSalaryType] = useState("USD");
  const [experienceId, setExperienceId] = useState("");
  const [employmentTypeId, setEmploymentTypes] = useState("");
  const [description, setDescription] = useState(
    "<h2>Обязанности</h2><ul><li></li><li></li></ul><h2>Требования</h2><ul><li></li><li></li></ul><h2>Условия</h2><ul><li></li></ul>"
  );

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExperiences());
    dispatch(getSkills());
    dispatch(getEmpType());
  }, [dispatch]);

  const handleOnSpecChange = (e) => {
    setSpecializationName(e.target.dataset.name);
    setSpecializationId(e.target.value);
    setSpecModalOpen(false);
  };

  const handleChangeExp = (e) => {
    setExperienceId(e.target.value);
  };

  const onSkillsChange = (data) => {
    const skillsArray = data.map((item) => item.name);
    setSelectedSkills(skillsArray.join(","));
  };

  const handleSave = () => {
    if (!experienceId) {
      alert("Please select an experience level.");
      return;
    }

    const vacancyData = {
      name,
      specializationId,
      cityId: `${cityId}`,
      description,
      employmentTypeId,
      salary_from,
      salary_to,
      salary_type,
      address,
      experienceId,
      skills,
      about_company: "",
    };

    console.log("Sending vacancy data:", vacancyData);
    dispatch(createVacancy(vacancyData, router));
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const allSkills = useSelector((state) => state.vacancy.skills);
  const empTypes = useSelector((state) => state.vacancy.empTypes);

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
          {specializationName && <p>{specializationName}</p>}
          <p className="link" onClick={() => setSpecModalOpen(true)}>
            Указать специализацию
          </p>
        </fieldset>
        {isSpecModalOpen && (
          <ModalSelectSpec
            close={() => setSpecModalOpen(false)}
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
          <label>Расскажите про вакансию</label>
          <div>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [
                  "bold",
                  "italic",
                  "bulletedList",
                  "numberedList",
                  "redo",
                ],
              }}
              data={description}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>
        </fieldset>
        <AutoCompliteTags
          placeholder=""
          type="text"
          label="Ключевые навыки"
          size="fieldset-md fieldset-vertical"
          items={allSkills}
          onSelect={onSkillsChange}
          selected={
            skills.length > 0
              ? skills.split(",").map((item) => ({ name: item }))
              : []
          }
        />
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
        <button className="button button-primary" onClick={handleSave}>
          Создать
        </button>
      </div>
    </main>
  );
}
