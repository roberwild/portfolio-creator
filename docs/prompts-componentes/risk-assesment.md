# Prompt para crear componente de Evaluación de Riesgo en React

Necesito desarrollar un componente React para una evaluación de perfil de riesgo de inversión. Este componente debe permitir a los usuarios responder preguntas sobre su tolerancia al riesgo y mostrar automáticamente su perfil calculado.

## Requisitos técnicos:
- Usa React con TypeScript y el patrón "use client" para Next.js
- Implementa gestión de estado con un store personalizado (ya existe usePortfolioWizardStore)
- Integra internacionalización con i18next
- Utiliza componentes UI de una biblioteca existente (Card, RadioGroup, Button, etc.)
- Debe ser compatible con modo oscuro/claro
- Procesa preguntas desde un archivo de constantes externo

## Comportamiento esperado:
- Muestra una serie de preguntas de evaluación de riesgo con opciones de respuesta tipo radio
- Calcula automáticamente el perfil cuando todas las preguntas están respondidas
- Muestra el perfil calculado con estilo visual diferenciado según el tipo (conservador, moderado, etc.)
- Incluye un mensaje informativo sobre el propósito de la evaluación

## Consideraciones de diseño:
- Utiliza tarjetas para cada pregunta con estilo consistente
- Diferencia visualmente los perfiles de riesgo con colores apropiados
- Incluye iconos informativos donde sea necesario
- Asegura que sea completamente responsive y accesible

El componente debe integrarse en un flujo tipo wizard para la creación de un portafolio de inversión.