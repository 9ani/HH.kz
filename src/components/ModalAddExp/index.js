export default function ModalAddExp({}) {
  const onChangeMonth = () => {};
  const onChangeYear = () => {};
  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="modal-inner">
        <h3>Опыт работы</h3>

        <h4>Начало работы</h4>

        <div className="selectDate selectdate-noday">
          <select
            onChange={onChangeMonth}
            placeholder="Месяц"
            className="input"
          >
            <option>январь</option>
            <option>февраль</option>
            <option>март</option>
            <option>апрель</option>
            <option>май</option>
            <option>июнь</option>
            <option>июль</option>
            <option>август</option>
            <option>сентябрь</option>
            <option>октябрь</option>
            <option>ноябрь</option>
            <option>декабрь</option>
          </select>
          <input
            className="input"
            placeholder="Год"
            type="text"
            onChange={onChangeYear}
          />
        </div>
      </div>
    </div>
  );
}
