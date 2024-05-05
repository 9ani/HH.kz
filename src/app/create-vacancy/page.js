"use client";
import { useState } from "react";
import { useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import {
  getCities,
  getSpecializations,
  getExperiences,
  getSkills,
} from "../store/slices/vacancySlice";
import ModalSelectSpec from "@/components/ModalSelectSpec";
import AutoCompliteSelect from "@/components/AutoCompliteSelect";
import AutoCompliteTags from "@/components/AutoCompliteTags";
export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState();
  const [isSpecModalOpen, setSpecModalOpen] = useState(false);
  const [cityId, setCity] = useState();
  const [address, setAddress] = useState();
  const [salary_from, setSalaryFrom] = useState("");
  const [salary_to, setSalaryTo] = useState("");
  const [skills, setSelectedSkills] = useState([]);
  const [salary_type, setSalaryType] = useState("");
  const [experienceId, setExperienceId] = useState();
  const [description, setDescription] = useState(
    "<h2>Обязанности</h2><ul><li></li><li></li></ul><h2>Требования</h2><ul><li></li><li></li></ul><h2>Условия</h2><ul><li></li><li></li></ul>"
  );

  const dispatch = useDispatch();
  const closeSpecModal = () => {
    setSpecModalOpen(false);
  };
  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExperiences());
    dispatch(getSkills());
  }, []);

  const handleOnSpecChange = (e) => {
    setSpecializationId(e.target.value * 1);
  };

  const cities = useSelector((state) => state.vacancy.cities);
  const experiences = useSelector((state) => state.vacancy.experiences);
  const allSkills = useSelector((state) => state.vacancy.skills);

  const handleChangeExp = (e) => {
    setExperienceId[e.target.value];
  };

  const onSkillsChange = (data) => {
    const arr = data.map((item) => item.name);
    setSelectedSkills(arr.join(","));
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
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
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
      </div>
    </main>
  );
}
