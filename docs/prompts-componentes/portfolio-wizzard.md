# Prompt para Crear un Asistente de Creación de Portfolios de Inversión

## Objetivo
Desarrolla un asistente paso a paso (wizard) en React para guiar a los usuarios en la creación de portfolios de inversión. El componente debe gestionar un flujo estructurado desde la información básica hasta la confirmación final.

## Requisitos técnicos
- Utiliza React con "use client" para compatibilidad con Next.js
- Implementa gestión de estado con zustand (store personalizado)
- Crea una interfaz responsiva con soporte para modo oscuro
- Incluye validaciones en cada paso y transiciones fluidas

## Estructura de pasos
1. **Modal Informativo**: Introducción al proceso
2. **Datos Básicos**: Nombre del portfolio y datos fundamentales
3. **Evaluación de Riesgo**: Cuestionario para determinar perfil
4. **Selección de Empresas**: Elegir compañías para invertir
5. **Asignación de Portfolio**: Distribución de porcentajes
6. **Resumen**: Vista previa antes de confirmar

## Funcionalidades clave
- Navegación entre pasos con botones Anterior/Siguiente
- Indicador visual de progreso
- Validaciones específicas para cada paso
- Confirmación antes de reiniciar el proceso
- Pantalla de éxito al completar el portfolio
- Opciones para ver portfolios creados o comenzar uno nuevo

## Experiencia de usuario
- Incluir transiciones suaves entre pasos
- Mostrar claramente el progreso actual
- Proporcionar feedback visual sobre validaciones
- Botones con iconos y efectos de hover
- Diseño limpio con tarjetas y sombras sutiles

El código debe ser modular, estar bien estructurado y ofrecer una experiencia fluida e intuitiva para usuarios que desean crear portfolios de inversión personalizados.