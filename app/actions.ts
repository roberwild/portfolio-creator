"use server";

import { redirect } from "next/navigation";

// Acción para crear un nuevo portfolio (versión pública)
export const createPortfolioAction = async (formData: FormData) => {
  // En una versión pública, simplemente procesamos los datos y redirigimos
  // No es necesario guardar datos de usuario
  const portfolioName = formData.get("name")?.toString();
  
  if (!portfolioName) {
    return redirect("/crear-portfolio?error=El nombre del portfolio es obligatorio");
  }
  
  // Aquí procesaríamos los datos del portfolio sin autenticación
  // y podríamos almacenarlos con un ID aleatorio o similar
  
  return redirect("/portfolios");
};

// Puedes agregar más acciones públicas según sea necesario
