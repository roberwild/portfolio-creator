# Prompt para generar pantalla de bienvenida de un creador de portfolios de inversión

Crea un componente React para Next.js que funcione como pantalla de bienvenida para un asistente de creación de portfolios de inversión. El componente debe estar en español y ser visualmente atractivo.

## Requisitos técnicos
- Usa "use client" para componente cliente en Next.js
- Importa React, Image y varios iconos de Lucide (BarChart3, LineChart, PieChart, etc.)
- Utiliza un store personalizado con usePortfolioWizardStore para manejar el estado del wizard
- Implementa componentes UI como Button, Card y CardContent
- Estilizado con TailwindCSS

## Estructura y contenido
- Encabezado con ícono Info, título "Bienvenido al Creador de Portfolios" y descripción
- Grid de 4 tarjetas destacando características principales:
  - Personalización Total (ícono Target)
  - Gestión de Riesgos (ícono Shield)
  - Diversificación Inteligente (ícono PieChart)
  - Análisis en Tiempo Real (ícono TrendingUp)
- Sección "Cómo funciona" con lista numerada de 5 pasos
- Botón CTA "Comenzar ahora" que avanza al siguiente paso del wizard

## Detalles visuales
- Diseño responsivo (mobile-first con breakpoints md)
- Animación de entrada suave
- Efectos hover en tarjetas con transición de bordes
- Esquema de colores usando variables primary, border, muted-foreground
- Iconos con fondos circulares semitransparentes

Debe ser un componente funcional moderno que guíe al usuario a través del proceso de creación de portfolio de inversiones.