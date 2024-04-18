"use client";
import logo from "@/app/images/logo.svg";
import Image from "next/image";

import { useState } from "react";

export default function EmployerSignUp() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [first_name, setName] = useState("");
  const [last_name, setSurname] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_description, setCompanyDesc] = useState("");
  const [company_address, setCompanyAdr] = useState("");
  const [company_logo, setCompanyLogo] = useState();




  

  return (
    <main className="bg">
      <div className="container">
        <div className="auth-header">
          <Image src={logo} alt="icon" />
          <p>
            Зарегистрируйтесь сейчас, чтобы купить доступ к базе резюме или
            публикацию вакансий по выгодным ценам — все акции уже ждут вас в
            разделе «Спецпредложения».
          </p>
          <p>Ответим на ваши вопросы</p>
          <a href="tel:77272321313">+7 727 232 13 13</a>
        </div>
        <section className="login-page">
          {step === 1 && (
            <div className="card">
              <h1>Регистрация для поиска сотрудников</h1>
              <p>В завершении на почту придёт пароль</p>
              <form>
                <input
                  className="input"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="button button-primary"
                  onClick={() => setStep(2)}
                >
                  Продолжить
                </button>
              </form>
            </div>
          )}
          {step === 2 && (
            <div className="card">
              <h1>Как вас зовут</h1>
              <p>
                Напишите его, чтобы подтвердить, что это вы, а не кто-то другой
                входит в личный кабинет
              </p>
              <form>
                <input
                  className="input"
                  placeholder="Имя"
                  value={first_name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Фамилия"
                  value={last_name}
                  onChange={(e) => setSurname(e.target.value)}
                />
                
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => setStep(3)}
                >
                  Подтвердить
                </button>
                <button
                  className="button button-primary-bordered"
                  onClick={() => setStep(1)}
                >
                  Назад
                </button>
              </form>
            </div>
          )}
          {step === 3 && (
            <div className="card">
              <h1>Введите название компании</h1>
              <p>
                Напишите его, чтобы подтвердить, что это вы, а не кто-то другой
                входит в личный кабинет
              </p>
              <form>
                <input
                  className="input"
                  placeholder="Название компании"
                  value={company_name}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  className="input"
                  placeholder="Фамилия"
                  value={last_name}
                  onChange={(e) => setSurname(e.target.value)}
                />
                
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => setStep(3)}
                >
                  Подтвердить
                </button>
                <button
                  className="button button-primary-bordered"
                  onClick={() => setStep(1)}
                >
                  Назад
                </button>
              </form>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
