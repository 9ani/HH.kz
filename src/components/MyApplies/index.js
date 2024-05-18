import MyApply from "./apply.js";
import { useSelector } from "react-redux";
export default function MyApplies({ resumes }) {
  const applies = useSelector((state) => state.apply.applies);
  const showApplies = Array.isArray(resumes)
    ? applies.map((item) => <MyApply item={item} key={item.id} />)
    : null;

  return (
    <div className="table">
      <div className="row row-header flex">
        <div className="col">Статус</div>
        <div className="col">Вакансия</div>
        <div className="col">Дата</div>
      </div>
      {showApplies}
    </div>
  );
}
