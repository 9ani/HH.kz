import MyResume from "./myresume";

export default function MyResumes({ resumes }) {
  const showResumes = Array.isArray(resumes)
    ? resumes.map((item) => (
        <MyResume
          position={item.position}
          createdAt={item.createdAt}
          show={0}
          views={0}
          applies={0}
          key={item.id}
        />
      ))
    : null;

  return <div>{showResumes}</div>;
}
