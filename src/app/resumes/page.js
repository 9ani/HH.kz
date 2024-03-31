import Header from "../../components/header"

export default function Login() {
  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb7">
            <h1>Мои Резюме</h1>
            <button className="button button-secondary-bordered">Создать резюме</button>
        </div>
      </div>
    </main>
  );
}
