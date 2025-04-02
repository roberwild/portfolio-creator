import { redirect } from "next/navigation";

export default function ResetPassword() {
  // En la versión pública, redirigimos a la página principal
  redirect("/");
}
