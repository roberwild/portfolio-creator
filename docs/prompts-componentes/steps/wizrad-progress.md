# Prompt para Componente de Barra de Progreso Interactiva para Wizard

Desarrolla un componente React (TypeScript) que muestre una barra de progreso interactiva para un asistente de configuración de portafolios de inversión. El componente debe ser moderno, accesible y adaptativo.

## Funcionalidades clave

- **Navegación condicional**: Permite volver a pasos ya visitados pero bloquea acceso a pasos futuros
- **Visualización de estados**: Diferencia visualmente entre pasos actuales, completados y futuros
- **Indicadores interactivos**: Muestra elementos visuales que indican la posibilidad de navegación
- **Diseño responsivo**: Visualización vertical en móvil y horizontal en escritorio

## Estructura esperada

- Props para `currentStep` (paso actual) y `maxStepVisited` (paso máximo alcanzado)
- Integración con un store personalizado que proporciona `goToStep(id)`
- Lista de pasos para un wizard de inversiones: Información básica, Evaluación de riesgo, etc.
- Ocultamiento completo cuando se está en el paso introductorio (ID -1)

## Aspectos visuales

- Usa Tailwind CSS para estilos condicionales
- Implementa iconos para indicar estados (check para completado, flechas para navegación)
- Incluye efectos de hover y transiciones suaves para mejorar la UX
- Estados visuales claros que distingan entre pasos activos, completados y futuros

El componente debe seguir buenas prácticas de accesibilidad y proporcionar feedback visual claro sobre el progreso del usuario a través del asistente.