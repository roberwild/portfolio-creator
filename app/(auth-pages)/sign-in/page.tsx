import { redirect } from "next/navigation";

export default function Login() {
  // En la versión pública, redirigimos a la página principal
  redirect("/");
}
