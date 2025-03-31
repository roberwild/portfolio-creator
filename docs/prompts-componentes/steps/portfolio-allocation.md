# Prompt para Componente de Asignación de Portfolio

Crea un componente React para gestionar la asignación de inversiones en un portfolio financiero. El componente debe permitir a los usuarios distribuir su capital entre diferentes empresas seleccionadas previamente.

## Requerimientos principales:

- Desarrolla un componente de asignación de cartera que permita distribuir inversiones entre empresas mediante porcentajes y número de acciones
- Implementa visualizaciones con gráficos circulares para mostrar distribución por empresa, sector industrial y región geográfica
- Crea una tabla interactiva que permita modificar asignaciones con entradas numéricas y deslizadores
- Incluye funcionalidad para bloquear/desbloquear empresas específicas durante el rebalanceo automático
- Añade un sistema de rebalanceo proporcional que ajuste automáticamente las empresas no bloqueadas
- Muestra un resumen con porcentajes y montos asignados/restantes
- Implementa distribución equitativa automática como opción predeterminada

## Especificaciones técnicas:

- Utiliza React y Zustand/Context para la gestión de estado
- Integra Recharts para visualizaciones
- Implementa componentes UI como Card, Table, Slider, Button de una biblioteca de componentes
- Usa Lucide para iconografía
- Incluye tabs para organizar diferentes vistas de los gráficos
- Todo en español para el mercado hispanohablante

El componente debe actualizar calculando precios, acciones y porcentajes en tiempo real, manteniendo siempre consistencia entre los diferentes valores y respetando el presupuesto total de inversión.