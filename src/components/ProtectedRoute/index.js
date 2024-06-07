import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const decodeToken = jwtDecode(token);
    if (decodeToken.exp * 1000 < Date.now()) {
      if (decodeToken.role.name === "employee") {
        router.push("/login");
      } else {
        router.push("/employer/signin");
      }
    }
  }, []);

  return <>{children}</>;
}
