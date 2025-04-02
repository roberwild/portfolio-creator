import { redirect } from "next/navigation";

export default function ForgotPassword() {
  // En la versión pública, redirigimos a la página principal
  redirect("/");
}
