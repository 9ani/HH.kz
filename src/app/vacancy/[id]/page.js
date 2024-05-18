"use client";
import Header from "@/components/header";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getVacancyById } from "@/app/store/slices/vacancySlice";
import { useParams } from "next/navigation";
import { getMyResumes } from "@/app/store/slices/resumeSlice";
import { createApply, getEmployeeApplies } from "@/app/store/slices/applySlice";
export default function VacancyPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const vacancy = useSelector((state) => state.vacancy.vacancy);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const resumes = useSelector((state) => state.resume.resumes);
  const applies = useSelector((state) => state.apply.applies);

  const [resumeId, setResume] = useState();
  useEffect(() => {
    if (resumes[0]) {
      setResume(resumes[0].id);
    }
  }, [resumes]);
  const didMount = () => {
    dispatch(getVacancyById(id));
    dispatch(getMyResumes());
    dispatch(getEmployeeApplies());
  };

  useEffect(didMount, []);

  const handleApply = () => {
    dispatch(
      createApply({
        resumeId,
        vacancyId: id,
      })
    );
  };
  let isApplied = applies.some(item => item.vacancyId === id*1)
  let skills = [];
  if (vacancy.skills) {
    skills = vacancy.skills.split(",");
  }
  return (
    <main>
      <Header />
      <div className="container">
        {currentUser.id && currentUser.id === vacancy.userId && (
          <div className="flex flex-ai-c flex-jc-sb ptb7">
            <Link
              className="button button-secondary-bordered"
              href={`/edit-vacancy/${vacancy.id}`}
            >
              Редактировать
            </Link>
          </div>
        )}
        <div className="card mt7">
          <h1>{vacancy.name}</h1>
          <p>
            {vacancy.salary_from && `от ${vacancy.salary_from}`}{" "}
            {vacancy.salary_to && `до ${vacancy.salary_to}`}{" "}
            {vacancy.salary_type && `${vacancy.salary_type}`}
          </p>
          {vacancy.employmentType && (
            <p>Тип занятости: {vacancy.employmentType.name}</p>
          )}
          {vacancy.experience && (
            <p>Требуемый опыт работы: {vacancy.experience.duration}</p>
          )}
          {vacancy.employmentType && (
            <p>Тип занятости: {vacancy.employmentType.name}</p>
          )}
          {currentUser && currentUser.role.name === "employee" && (
            <select
              className="input mtb4"
              value={resumeId}
              onChange={(e) => setResume(e.target.value)}
              style={{maxWidth: `200px`}}
            >
              {resumes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.position}
                </option>
              ))}
            </select>
          )}

          {currentUser && currentUser.id !== vacancy.userId && !isApplied && (
            <button className="button button-primary" onClick={handleApply}>
              Откликнуться
            </button>
          )}
          {currentUser && currentUser.id !== vacancy.userId && isApplied && (
            <Link className="button button-primary" style={{maxWidth: `200px`}} href="/applies">
              Смотреть отклик
            </Link>
          )}
        </div>

        {vacancy.company && (
          <p className="secondary mt7">
            <b>{vacancy.company.name}</b>
          </p>
        )}
        {vacancy.company && (
          <p className="secondary">{vacancy.company.description}</p>
        )}
        <p
          className="secondary"
          dangerouslySetInnerHTML={{ __html: vacancy.description }}
        ></p>
        <p className="secondary">{vacancy.address}</p>

        <h3 className="mt7">Ключевые навыки</h3>
        {skills.map((skill, index) => (
          <span className="tag mr-4" key={`${skill}-${index}`}>
            {skill}
          </span>
        ))}
      </div>
    </main>
  );
}
