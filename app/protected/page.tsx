import { redirect } from "next/navigation";

export default function PublicPage() {
  // Redirigimos a la página principal ya que esta ya no es una página protegida
  redirect("/");
}
