const russianMonths = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

export default function WorkingHistory({ workingHistory , remove}) {
  const startDate = new Date(workingHistory.start_date);
  const endDate = new Date(workingHistory.end_date);

  return (
    <div className="working-history">
      <span>
        {russianMonths[startDate.getMonth()]} {startDate.getUTCFullYear()} -{" "}
        {russianMonths[endDate.getMonth()]} {endDate.getUTCFullYear()}
      </span>
      <h4>{workingHistory.company_name}</h4>
      <h4>{workingHistory.company_description}</h4>
      <span onClick={() => remove(workingHistory)}>Удалить</span>
    </div>
  );
}
