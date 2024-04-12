import MyResume from "./myresume";

export default function MyResumes({ resumes }) {
  const showResumes = Array.isArray(resumes)
    ? resumes.map((item) => (
        <MyResume item={item}
          key={item.id}
        />
      ))
    : null;

  return <div>{showResumes}</div>;
}
