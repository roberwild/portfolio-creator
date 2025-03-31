# Prompt para Componente de Resumen de Portafolio de Inversiones

Crea un componente React para mostrar el resumen completo de un portafolio de inversiones financieras. El componente debe funcionar como la pantalla final de un asistente de creación de portafolios, mostrando toda la información relevante antes de que el usuario finalice el proceso.

## Requisitos técnicos

- Implementa un componente para Next.js (usa "use client")
- Utiliza React 18 con hooks (useState, useEffect, useMemo)
- Integra con Zustand para gestión del estado global
- Añade manejo robusto de errores con un fallback seguro
- Incluye logging detallado para facilitar depuración

## Funcionalidades principales

- Muestra un resumen visual del portafolio usando gráfico de pastel (Recharts)
- Presenta tabla detallada con las empresas seleccionadas y su asignación
- Visualiza información básica: nombre, inversión total, perfil de riesgo
- Verifica si el portafolio está completamente asignado (100%)
- Indica los próximos pasos disponibles al finalizar

## Componentes de UI

- Utiliza Shadcn UI para tarjetas, tablas y otros elementos
- Incorpora iconos de Lucide para mejorar la experiencia visual
- Implementa diseño responsivo que funcione en móvil y escritorio

## Detalles adicionales

- Todo el texto debe estar en español
- Formatea correctamente valores monetarios
- Incluye un sistema de colores para el gráfico que sea consistente
- Estructura el código con buenas prácticas de manejo de errores
- Implementa una versión simplificada como fallback si algo falla

El objetivo es crear una pantalla intuitiva que ayude a los usuarios a visualizar su asignación de inversiones antes de finalizar, con especial atención a la robustez del código y la experiencia de usuario.
