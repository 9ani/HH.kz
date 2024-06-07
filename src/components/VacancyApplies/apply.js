import { getAgeFromBirthday } from "@/app/utils/format";
import { useDispatch } from "react-redux";
import { acceptApply, declineApply } from "@/app/store/slices/applySlice";
import Link from "next/link";
export default function Apply({ item }) {
  const dispatch = useDispatch();
  const age = getAgeFromBirthday(item.resume.birthday);
  return (
    <div className="card ">
      <Link href={`/resumes/${item.resume.id}`}>{item.resume.position}</Link>
      <p>
        {item.resume.first_name} {item.resume.last_name},Возраст: {age} лет
      </p>
      <h3>
        {item.resume.salary}
        {item.resume.salary_type}
      </h3>
      <div className="flex">
        {item.status !== "INVITATION" && (
          <button
            className="button button-primary mr4"
            onClick={() => dispatch(acceptApply(item.id))}
          >
            Пригласить
          </button>
        )}
        {item.status !== "DECLINED" && (
          <button
            className="button button-secondary"
            onClick={() => dispatch(declineApply(item.id))}
          >
            Отказать
          </button>
        )}
      </div>
    </div>
  );
}
