import { useState } from "react";

export default function ModalAddExp({ close, addWorkingHistory }) {
  const [start_date, setStartDate] = useState(Date.now());
  const [end_date, setEndDate] = useState(Date.now());

  const [company_name, setCompany_name] = useState("");
  const [company_description, setCompany_description] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const onChangeMonth = (e) => {
    let date = new Date(start_date);
    date.setMonth(e.target.value);
    setStartDate(date.toISOString());
  };

  const onChangeYear = (e) => {
    let date = new Date(start_date);
    date.setFullYear(e.target.value);
    setStartDate(date.toISOString());
  };
  const onChangeMonthEnd = (e) => {
    let date = new Date(end_date);
    date.setMonth(e.target.value);
    setEndDate(date.toISOString());
  };
  const onChangeYearEnd = (e) => {
    let date = new Date(end_date);
    date.setFullYear(e.target.value);
    setEndDate(date.toISOString());
  };
  const onChangeCompanyName = (e) => {
    setCompany_name(e.target.value);
  };

  const onChangeCompanyDesc = (e) => {
    setCompany_description(e.target.value);
  };

  const onChangeResp = (e) => {
    setResponsibilities(e.target.value);
  };

  const save = () => {
    const workingHistory = {
      start_date,
      end_date,
      responsibilities,
      company_name,
      company_description,
    };

    addWorkingHistory(workingHistory);
  };

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={close}></div>
      <div className="modal-inner">
        <h2>Опыт работы</h2>

        <h4>Начало работы</h4>

        <div className="selectDate selectdate-noday">
          <select
            onChange={onChangeMonth}
            placeholder="Месяц"
            className="input"
          >
            <option disabled selected>
              Выберите месяц
            </option>
            <option value={0}>январь</option>
            <option value={1}>февраль</option>
            <option value={2}>март</option>
            <option value={3}>апрель</option>
            <option value={4}>май</option>
            <option value={5}>июнь</option>
            <option value={6}>июль</option>
            <option value={7}>август</option>
            <option value={8}>сентябрь</option>
            <option value={9}>октябрь</option>
            <option value={10}>ноябрь</option>
            <option value={11}>декабрь</option>
          </select>
          <input
            className="input"
            placeholder="Год"
            type="text"
            onChange={onChangeYear}
          />
        </div>

        <h4>Конец работы</h4>

        <div className="selectDate selectdate-noday">
          <select
            onChange={onChangeMonthEnd}
            placeholder="Месяц"
            className="input"
          >
            <option disabled selected>
              Выберите месяц
            </option>
            <option value={0}>январь</option>
            <option value={1}>февраль</option>
            <option value={2}>март</option>
            <option value={3}>апрель</option>
            <option value={4}>май</option>
            <option value={5}>июнь</option>
            <option value={6}>июль</option>
            <option value={7}>август</option>
            <option value={8}>сентябрь</option>
            <option value={9}>октябрь</option>
            <option value={10}>ноябрь</option>
            <option value={11}>декабрь</option>
          </select>
          <input
            className="input"
            placeholder="Год"
            type="text"
            onChange={onChangeYearEnd}
          />
        </div>

        <h4>Организация</h4>
        <input
          className="input"
          placeholder="Название компании"
          type="text"
          onChange={onChangeCompanyName}
          value={company_name}
        />

        <h4>Должность</h4>
        <input
          className="input"
          placeholder="Должность"
          type="text"
          onChange={onChangeCompanyDesc}
          value={company_description}
        />

        <h4>Обязанности на рабочем месте</h4>
        <textarea
          className="textarea"
          placeholder="Напишите что вы делали на работе "
          type="text"
          onChange={onChangeResp}
        >
          {responsibilities}
        </textarea>

        <div className="modal-actions">
          <button className="button button-primary-bordered" onClick={close}>
            Отменить
          </button>
          <button className="button button-primary" onClick={save}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
