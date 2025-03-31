# Prompt para Componente de Información Básica de Portafolio

Crea un componente React para la primera pantalla de un asistente de portafolio de inversiones que recopile la información básica. El componente debe estar en español y ofrecer una experiencia de usuario intuitiva.

## Requisitos principales:
- Componente de cliente para Next.js (use client)
- Utiliza un store global para gestionar el estado del asistente
- Recopila dos datos principales:
  - Nombre del portafolio (campo de texto)
  - Monto total de inversión (mediante slider e input numérico sincronizados)
- El monto debe estar limitado entre 1.000 y 1.000.000, con incrementos de 1.000
- Incluye validación de datos y formateo de moneda
- Proporciona información contextual para ayudar al usuario

## Estructura visual:
- Título y descripción introductoria
- Sección para nombre del portafolio con explicación
- Sección para monto de inversión con slider e input numérico
- Recuadro informativo explicando la importancia de estos datos

## Diseño:
- Utiliza componentes UI existentes (Input, Label, Slider)
- Aplica Tailwind CSS para el estilizado
- Mantén una jerarquía visual clara con espaciado adecuado

El resultado debe ser un componente limpio, intuitivo y fácilmente integrable en un asistente multi-paso.