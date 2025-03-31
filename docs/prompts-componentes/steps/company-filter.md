# Prompt para Crear Componente de Filtros de Empresas en React

```jsx
Crea un componente de React con TypeScript que funcione como un panel de filtros avanzados para empresas en una aplicación de inversión. El componente debe seguir estas especificaciones:

## Funcionalidad principal
- Permitir filtrar empresas por sectores industriales, regiones geográficas, capitalización de mercado, rendimiento de dividendos y volatilidad
- Mostrar visualmente los filtros activos como badges eliminables
- Ofrecer opción para excluir sectores completos del portafolio (usando estado global)
- Incluir un botón para restablecer todos los filtros

## Estructura técnica
- Usar "use client" para Next.js
- Implementar interfaz con acordeones expandibles para cada categoría de filtros
- Utilizar checkboxes para selecciones múltiples (sectores/regiones)
- Implementar sliders para rangos numéricos (capitalización, dividendos, volatilidad)
- Conectar con una tienda Zustand para los sectores excluidos
- Emitir eventos al componente padre cuando cambien los filtros

## Detalles específicos
- Para capitalización de mercado: slider dual ($0B - $1T+)
- Para dividendos: slider simple para mínimo (0-10%)
- Para volatilidad: slider simple para máximo (0-100%)
- Convertir valores de UI (porcentajes/billions) a valores reales al enviar al padre

El diseño debe ser responsive con una estética moderna usando componentes de UI personalizados.
```