"use client";
import logo from "@/app/images/logo.svg";
import Image from "next/image";
import { setError } from "@/app/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function EmployerSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const handleSignIn = () => {};

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
          <div className="card">
            <h1>Вход для поиска сотрудников</h1>
            <form>
              <input
                className="input"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button button-primary" onClick={handleSignIn}>
                Войти
              </button>
            </form>
            {error &&
              Object.keys(error).map((key) => (
                <p className="error" key={key}>
                  {error[key]}
                </p>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
