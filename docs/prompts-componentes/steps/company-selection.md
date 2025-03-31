# Prompt para Crear un Componente de Selección de Empresas en React

Necesito un componente React para un asistente de creación de portfolios de inversión que permita a los usuarios seleccionar compañías. El componente debe tener estas características:

## Funcionalidad principal
- Mostrar una tabla interactiva de empresas con datos como nombre, sector, región, precio, dividendo y volatilidad
- Permitir seleccionar hasta 20 empresas mediante checkboxes
- Implementar búsqueda global, filtros y ordenación en múltiples campos
- Sincronizar las selecciones con un estado global usando un custom store
- Implementar paginación para navegar entre resultados

## Estructura y diseño
- División en layout responsive con sidebar de filtros (1/4) y tabla principal (3/4)
- Mostrar contador de empresas seleccionadas (X de 20)
- Deshabilitar la selección cuando se alcance el límite máximo
- Formatear correctamente valores monetarios y porcentajes

## Requisitos técnicos
- Usar TanStack Table (react-table v8) para gestionar la tabla
- Implementar filtrado avanzado que combine búsqueda global con filtros específicos
- Utilizar componentes de UI de una biblioteca de diseño consistente
- Optimizar con useMemo para evitar cálculos innecesarios
- Sincronizar bidireccional entre el estado de la tabla y el store global

## Lógica de negocio
- Aplicar restricciones de selección basadas en cuota máxima
- Permitir excluir sectores específicos definidos en el store global
- Implementar formateo específico para diferentes tipos de datos

El componente debe ser parte de un flujo tipo wizard y estar optimizado para usabilidad.