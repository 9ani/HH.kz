"use client";
import Header from "@/components/header";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedVacancies } from "@/app/store/slices/vacancySlice";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Vacancy from "@/app/vacancy/page";
export default function SearchVacancy() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    dispatch(
      getSearchedVacancies({
        q,
        specializationId,
        cityId,
        experienceId,
        employmentTypeId,
        salary,
        salary_type,
      })
    );
  }, []);

  const vacancies = useSelector((state) => state.vacancy.searchedVacancies);
  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb7"></div>
      </div>
    </main>
  );
}
