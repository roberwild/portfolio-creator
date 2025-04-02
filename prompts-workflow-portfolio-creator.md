# Workshop de Portfolio Manager - Secuencia de Prompts

## Introducción

Esta guía contiene la secuencia de prompts para el workshop de desarrollo de un Portfolio Manager utilizando Next.js, React y Cursor con Vibe Coding. Siguiendo estos prompts en orden, los participantes podrán construir una aplicación completa desde cero.

### Cómo usar esta guía

1. Abre Cursor en tu computadora
2. Activa el modo indicado para cada prompt (Ask, Agent o Edit)
3. Copia y pega cada prompt en el orden indicado
4. Sube los archivos adjuntos recomendados cuando se indique
5. Espera a que Cursor genere el código correspondiente 
6. Revisa el código generado y realiza ajustes mínimos si es necesario
7. Continúa con el siguiente prompt

**Importante:** 
- Algunos prompts requieren que subas archivos específicos al chat de Cursor para proporcionar el contexto necesario. Estos archivos se indican claramente en cada prompt cuando son necesarios.
- Durante los primeros 7 prompts, nos centraremos en la planificación, diseño y configuración del proyecto. No esperes ver código de implementación específico de la aplicación en esta fase.
- A partir del Prompt 8 comenzaremos a construir los componentes reales, una vez que tengamos una estructura sólida establecida.

## Fase 1: Exploración y Planificación

### Prompt 1 - Idea inicial (Modo: Ask)
```
Estoy pensando en crear una aplicación web para gestionar portfolios de inversión usando Next.js y React. En este momento, NO NECESITO CÓDIGO ni estructura de carpetas específica, solo quiero explorar conceptualmente las funcionalidades básicas que debería tener este tipo de aplicación. Por favor, proporciona solo una lista de funcionalidades clave y consideraciones importantes para este tipo de proyecto.
```

**Archivos adjuntos necesarios:** Ninguno

### Prompt 2 - Refinamiento de requisitos (Modo: Ask)
```
Basándome en las funcionalidades mencionadas, quiero implementar específicamente un asistente tipo wizard paso a paso para crear carteras de inversión. En este momento, NO NECESITO IMPLEMENTACIÓN DE CÓDIGO, solo quiero que me expliques conceptualmente cómo se podría estructurar este flujo paso a paso y qué elementos debería incluir cada etapa del proceso.
```

**Archivos adjuntos necesarios:** Ninguno

### Prompt 3 - Selección de tecnologías (Modo: Ask)
```
Para mi proyecto de Portfolio Manager he decidido usar Next.js con React, TypeScript, Tailwind para los estilos, y Zustand para gestión de estado. Antes de comenzar a codificar, me gustaría recibir recomendaciones sobre bibliotecas adicionales para: visualización de datos/gráficos, componentes de UI, manejo de formularios, animaciones, y pruebas. NO IMPLEMENTES NADA TODAVÍA, solo proporciona recomendaciones con breves explicaciones de por qué serían útiles en este proyecto.
```

**Archivos adjuntos necesarios:** Ninguno

## Fase 2: Configuración Inicial del Proyecto

### Prompt 4 - Planificación de estructura (Modo: Ask)
```
Ahora que tengo claras las funcionalidades y tecnologías, quiero establecer la estructura base del proyecto. ¿Podrías recomendarme una estructura de carpetas óptima para un proyecto Next.js moderno que siga las mejores prácticas actuales? NO IMPLEMENTES NADA TODAVÍA, solo proporciona una recomendación conceptual de la estructura de carpetas y archivos necesarios.
```

**Archivos adjuntos necesarios:** Ninguno

### Prompt 5 - Archivos de configuración y estilos corporativos (Modo: Agent)
```
Basado en la estructura recomendada y las tecnologías que quiero usar (Next.js, React, TypeScript, Tailwind CSS, Zustand, recharts para gráficos, y @tanstack/react-table para tablas), genera los siguientes archivos de configuración:
1. Un package.json completo con todas las dependencias necesarias, incluyendo todos los paquetes de Radix UI que necesitaremos (@radix-ui/react-button, @radix-ui/react-card, @radix-ui/react-slider, etc.) para construir nuestros componentes UI personalizados siguiendo el patrón de diseño de shadcn/ui
2. tailwind.config.js optimizado para nuestros componentes, incorporando la paleta de colores corporativos de Singular Bank
3. tsconfig.json con rutas absolutas
4. configuración de ESLint/Prettier para mantener la calidad del código
5. Estructura básica para incorporar los assets corporativos que te he adjuntado:
   - Coloca las fuentes corporativas en la carpeta apropiada
   - Integra las imágenes de logo y otros recursos visuales
   - Configura el archivo de estilos globales utilizando la hoja de estilos CSS proporcionada

Los colores corporativos principales incluyen:
- Primario: #e63927 (rojo)
- Secundario: #000000 (negro)
- Terciario: #ffffff (blanco)
- Neutros: diferentes tonos de gris

Asegúrate de incluir todas las dependencias que necesitaremos para el Portfolio Manager, incluyendo framer-motion para animaciones, next-themes para modo oscuro/claro, y i18next para internacionalización.
```

**Archivos adjuntos necesarios:** 
- Archivos de fuentes corporativas (Lynstone en sus diferentes pesos)
- Logo e imágenes corporativas de Singular Bank
- Archivo CSS con estilos corporativos
- Captura de pantalla de la web de Singular Bank (para referencia visual)

### Prompt 6 - Creación de estructura de carpetas (Modo: Agent)
```
Ahora implementa la estructura de carpetas completa que recomendaste anteriormente. Genera solo los archivos y carpetas base necesarios (sin contenido complejo dentro de ellos, solo placeholders básicos) para que podamos tener la estructura completa del proyecto antes de comenzar a implementar componentes específicos.
```

**Archivos adjuntos necesarios:** Ninguno

### Prompt 7 - Tipos y definiciones (Modo: Agent)
```
Define todos los tipos TypeScript necesarios para nuestro Portfolio Manager: interfaces para Company, Portfolio, Position, RiskProfile, User, y todos los demás modelos de datos que necesitaremos en la aplicación. Crea un archivo types.ts con todas estas definiciones. Asegúrate de que los nombres y estructuras sean coherentes con la terminología financiera utilizada por Singular Bank.
```

**Archivos adjuntos necesarios:** Ninguno

## Fase 3: Configuración del Sistema de Diseño y Componentes Básicos

### Prompt 8 - Tema y sistema de diseño (Modo: Agent)
```
Configura un sistema de tema robusto para nuestro Portfolio Manager usando next-themes para implementar un modo claro/oscuro totalmente funcional. Define un sistema de diseño completo basado en la identidad visual de Singular Bank con:
1. Tokens de color que funcionen en ambos modos, manteniendo el rojo #e63927 como color primario
2. Escalas de tipografía responsiva usando la familia 'Lynstone' que ya hemos incorporado
3. Sistema de espaciado consistente
4. Breakpoints para diferentes tamaños de pantalla
5. Estilos comunes para elementos interactivos que sigan el estilo corporativo

Asegúrate de que todos los componentes respeten este sistema y se adapten automáticamente al cambio de tema, manteniendo la coherencia visual con la marca Singular Bank.
```

**Archivos adjuntos necesarios:**
- `tailwind.config.js` (el archivo generado en el prompt 5)
- `package.json` (el archivo generado en el prompt 5)

### Prompt 9 - Configuración de componentes UI básicos con Radix (Modo: Agent)
```
Necesito configurar un conjunto de componentes UI reutilizables basados en Radix UI y Tailwind CSS siguiendo el patrón de diseño de shadcn/ui (componentes no instalables por npm, sino creados directamente en nuestro proyecto). Ayúdame a crear estos componentes básicos:

1. Button (/src/components/ui/button.tsx)
2. Card (/src/components/ui/card.tsx)
3. Input (/src/components/ui/input.tsx)
4. Slider (/src/components/ui/slider.tsx)
5. Checkbox (/src/components/ui/checkbox.tsx)
6. RadioGroup (/src/components/ui/radio-group.tsx)
7. Tabs (/src/components/ui/tabs.tsx)

Estos deben seguir el estilo corporativo de Singular Bank, usando el rojo #e63927 como color principal de acento y la tipografía 'Lynstone' que ya incorporamos. Asegúrate de que los componentes tengan un aspecto profesional y financiero, apropiado para una aplicación bancaria.

Verifica que las dependencias necesarias de Radix UI estén en el package.json (@radix-ui/react-checkbox, @radix-ui/react-radio-group, etc.) y sugiere añadir cualquiera que falte.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- `tailwind.config.js` (el archivo generado en el prompt 5)

### Prompt 10 - Responsividad (Modo: Agent)
```
Necesito que el Portfolio Manager sea completamente responsivo. Implementa un sistema de layouts fluidos usando Tailwind que funcione desde móviles pequeños (320px) hasta pantallas grandes (1920px+). Crea componentes que se adapten a diferentes dispositivos usando estrategias como: diseño mobile-first, grid/flex layouts adaptables, tipografía fluida, y media queries en puntos críticos. Define comportamientos específicos para cada componente en diferentes breakpoints.
```

**Archivos adjuntos necesarios:**
- `tailwind.config.js` (para trabajar con los breakpoints ya definidos)

### Prompt 11 - Componentes de datos y visualización (Modo: Agent)
```
Necesito componentes para mostrar y manipular datos en el Portfolio Manager. Crea componentes para: Table (usando @tanstack/react-table), gráficos (usando recharts para pie charts, line charts y bar charts), y componentes de visualización de porcentajes/estadísticas.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- `/src/types/index.ts` (el archivo de tipos generado en el prompt 7)

### Prompt 12 - Componentes de feedback y alertas (Modo: Agent)
```
El Portfolio Manager necesita componentes para proporcionar feedback al usuario. Crea: Alerts para mensajes de éxito/error, Toasts para notificaciones temporales (usando sonner o react-hot-toast), Modales de confirmación, y componentes de carga/progreso para operaciones asíncronas.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- Componentes básicos de UI generados en el prompt 9

## Fase 4: Generación de Datos Mock y Store Global

### Prompt 13 - Generación de datos mock (Modo: Agent)
```
Necesitamos simular una API de acciones para el Portfolio Manager. Crea funciones usando @faker-js/faker para generar datos realistas de empresas, sectores, regiones, precios históricos y métricas de rendimiento que usaremos en la aplicación.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- `/src/types/index.ts` (el archivo de tipos generado en el prompt 7)

### Prompt 14 - Store con Zustand (Modo: Agent)
```
Necesito implementar un store con Zustand para manejar el estado del wizard de creación de portfolios. Debe gestionar: el paso actual, datos del portfolio (nombre, inversión total), evaluación de riesgo, empresas seleccionadas, y asignaciones de porcentajes.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- `/src/types/index.ts` (el archivo de tipos generado en el prompt 7)

### Prompt 15 - Configuración de Zustand avanzada (Modo: Agent)
```
Vamos a mejorar nuestro store de Zustand para el Portfolio Manager. Configura persistencia de estado usando localStorage, separación en slices para diferentes aspectos del estado, y middleware para logging/debugging durante el desarrollo.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- `/src/stores/portfolio-store.ts` (el store básico de Zustand creado en el prompt 14)

### Prompt 16 - Utilidades y hooks personalizados (Modo: Agent)
```
Para completar nuestro stack, necesito algunas utilidades y hooks personalizados que faciliten el desarrollo: un hook useMediaQuery (usando react-responsive), una función para formatear valores monetarios, utilidades para validación de datos, y un sistema para gestionar carga asíncrona de datos.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)

## Fase 5: Implementación del Wizard de Creación de Portfolios

### Prompt 17 - Componente inicial del wizard (Modo: Agent)
```
Vamos a empezar por desarrollar el componente principal del wizard para crear portfolios. Necesito un componente PortfolioWizard.tsx que gestione un proceso de 5 pasos: Información básica, Evaluación de riesgo, Selección de empresas, Asignación de portfolio y Resumen. Debe tener una barra de progreso y botones para navegar entre pasos. El diseño debe seguir la identidad visual de Singular Bank que ya hemos configurado, con un aspecto profesional y bancario.
```

**Archivos adjuntos necesarios:**
- `/src/stores/portfolio-store.ts` (el store de Zustand creado para gestionar el estado del wizard)
- `/src/components/ui/button.tsx` y `/src/components/ui/card.tsx` (componentes de UI básicos generados anteriormente)

### Prompt 18 - Componente de Progreso (Modo: Agent)
```
Necesito un componente WizardProgress.tsx que muestre el progreso a través de los pasos del wizard, indicando visualmente los pasos completados, el actual y los pendientes. Debe permitir navegar a pasos ya completados.
```

**Archivos adjuntos necesarios:**
- `/src/components/portfolio-wizard/PortfolioWizard.tsx` (el componente creado en el paso anterior)
- `/src/stores/portfolio-store.ts` (el store de Zustand para acceder al estado del wizard)

### Prompt 19 - Componente de Introducción (Modo: Agent)
```
Crea un componente InfoModal.tsx que se muestre al inicio del wizard explicando el proceso de creación de portfolios y las características de la herramienta. El diseño debe ser atractivo y alineado con la identidad corporativa de Singular Bank ya configurada, utilizando el color rojo #e63927 para acentos y la tipografía 'Lynstone'. Incluye el logo de Singular Bank que ya incorporamos en la parte superior y asegúrate de que el contenido refleje el tono profesional y de confianza propio de una entidad bancaria.
```

**Archivos adjuntos necesarios:**
- `/src/components/ui/card.tsx` y `/src/components/ui/button.tsx` (componentes UI relevantes)
- `/src/stores/portfolio-store.ts` (el store de Zustand para integrar con el flujo del wizard)

### Prompt 20 - Configuración de animaciones (Modo: Agent)
```
Para mejorar la experiencia de usuario, añade animaciones suaves en el Portfolio Manager. Configura framer-motion para transiciones entre pasos del wizard, efectos de entrada/salida para componentes, y animaciones para los gráficos de visualización del portfolio.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- El componente PortfolioWizard.tsx creado en el prompt 17

## Fase 6: Desarrollo de los Pasos del Wizard

### Prompt 21 - Paso 1: Información Básica (Modo: Agent)
```
Desarrolla el componente para el primer paso del wizard: PortfolioBasics.tsx. Debe permitir al usuario establecer un nombre para el portfolio y definir el monto total de inversión utilizando un slider e input. Usa el store de Zustand para guardar estos valores.
```

**Archivos adjuntos necesarios:**
- El store de Zustand para gestionar el estado
- Los componentes UI (Input, Slider, Label) generados anteriormente
- El componente PortfolioWizard.tsx donde se integrará este paso

### Prompt 22 - Paso 2: Evaluación de Riesgo (Modo: Agent)
```
Desarrolla el componente para el segundo paso: RiskAssessment.tsx. Necesito un cuestionario con preguntas sobre horizonte temporal de inversión, tolerancia al riesgo, y comportamiento ante pérdidas. Basado en las respuestas, debe calcular un perfil de riesgo (conservador, moderado, equilibrado, crecimiento o agresivo).
```

**Archivos adjuntos necesarios:**
- El store de Zustand para gestionar las respuestas y el perfil calculado
- Los componentes UI (RadioGroup, Card) generados anteriormente
- Archivos de constantes o configuración para las preguntas del cuestionario (si existen)

### Prompt 23 - Componentes de formularios avanzados (Modo: Agent)
```
Para la parte de captura de datos en nuestro Portfolio Manager, necesito componentes de formularios más avanzados: Select con búsqueda, RadioGroup con diseño especial para preguntas de evaluación de riesgo, Sliders con marcadores y etiquetas, y campos de entrada numérica con validación.
```

**Archivos adjuntos necesarios:**
- `package.json` (el archivo generado en el prompt 5)
- Los componentes de formulario básicos generados en el prompt 9

### Prompt 24 - Paso 3: Selección de Empresas (Modo: Agent)
```
Desarrolla el componente para el tercer paso: CompanySelection.tsx. Debe mostrar una tabla con empresas disponibles para invertir (usar datos mock), permitir filtrarlas por sector/región, y permitir seleccionar hasta 20 empresas para el portfolio.
```

**Archivos adjuntos necesarios:**
- El componente de Table generado anteriormente
- Las funciones de datos mock para empresas
- El store de Zustand para gestionar las empresas seleccionadas

### Prompt 25 - Componente de Filtros (Modo: Agent)
```
Complementando el paso anterior, desarrolla un componente CompanyFilters.tsx que permita filtrar las empresas por sector, región, capitalización de mercado, dividendo y volatilidad.
```

**Archivos adjuntos necesarios:**
- El componente CompanySelection.tsx creado en el paso anterior
- Los componentes de formulario avanzados generados anteriormente
- Las interfaces de tipos para sectores y regiones

### Prompt 26 - Paso 4: Asignación de Portfolio (Modo: Agent)
```
Desarrolla el componente para el cuarto paso: PortfolioAllocation.tsx. Debe permitir asignar porcentajes a cada empresa seleccionada, visualizar la distribución en un gráfico de pastel, y tener la opción de distribuir equitativamente o manualmente.
```

**Archivos adjuntos necesarios:**
- El store de Zustand con las empresas seleccionadas
- Los componentes de visualización (gráficos de pastel de recharts)
- Los componentes de formulario (Slider, Input) generados anteriormente

### Prompt 27 - Paso 5: Resumen (Modo: Agent)
```
Desarrolla el componente final: PortfolioSummary.tsx. Debe mostrar un resumen de todas las selecciones: nombre del portfolio, monto total, perfil de riesgo, listado de empresas con sus asignaciones, y un gráfico que muestre la distribución por empresa, sector y región.
```

**Archivos adjuntos necesarios:**
- El store de Zustand con todos los datos del portfolio
- Los componentes de visualización (gráficos)
- Los componentes UI (Card, Table) generados anteriormente, moderado, equilibrado, crecimiento o agresivo).
```

**Archivos adjuntos necesarios:**
- El store de Zustand para gestionar las respuestas y el perfil calculado
- Los componentes UI (RadioGroup, Card) generados anteriormente
- Archivos de constantes o configuración para las preguntas del cuestionario (si existen)
```
### Prompt 22 - Componentes de formularios avanzados

Para la parte de captura de datos en nuestro Portfolio Manager, necesito componentes de formularios más avanzados: Select con búsqueda, RadioGroup con diseño especial para preguntas de evaluación de riesgo, Sliders con marcadores y etiquetas, y campos de entrada numérica con validación.
```

**Archivos adjuntos necesarios:**
- Los componentes de formulario básicos generados anteriormente
- `package.json` (para verificar dependencias relevantes para validación de formularios)
```
### Prompt 23 - Paso 3: Selección de Empresas

Desarrolla el componente para el tercer paso: CompanySelection.tsx. Debe mostrar una tabla con empresas disponibles para invertir (usar datos mock), permitir filtrarlas por sector/región, y permitir seleccionar hasta 20 empresas para el portfolio.
```

**Archivos adjuntos necesarios:**
- El componente de Table generado anteriormente
- Las funciones de datos mock para empresas
- El store de Zustand para gestionar las empresas seleccionadas
```
### Prompt 24 - Componente de Filtros

Complementando el paso anterior, desarrolla un componente CompanyFilters.tsx que permita filtrar las empresas por sector, región, capitalización de mercado, dividendo y volatilidad.
```

**Archivos adjuntos necesarios:**
- El componente CompanySelection.tsx creado en el paso anterior
- Los componentes de formulario avanzados generados anteriormente
- Las interfaces de tipos para sectores y regiones

 de distribuir equitativamente o manualmente.
```

### Prompt 26 - Paso 5: Resumen
```
Desarrolla el componente final: PortfolioSummary.tsx. Debe mostrar un resumen de todas las selecciones: nombre del portfolio, monto total, perfil de riesgo, listado de empresas con sus asignaciones, y un gráfico que muestre la distribución por empresa, sector y región.
```

**Archivos adjuntos necesarios:**
- El store de Zustand con todos los datos del portfolio
- Los componentes de visualización (gráficos)
- Los componentes UI (Card, Table) generados anteriormente

## Fase 7: Integración y Mejoras

### Prompt 27 - Componentes de navegación y layout
```
Para mejorar la navegación en nuestra aplicación de Portfolio Manager, necesito componentes de UI adicionales. Crea componentes para: navegación principal (Navigation), barras laterales (Sidebar), encabezados (Header), y estructuras de layout (Layout) que funcionen bien en dispositivos móviles y de escritorio.
```

**Archivos adjuntos necesarios:**
- Los componentes UI básicos generados anteriormente
- Configuración del sistema de diseño responsivo

### Prompt 28 - Integración de Componentes
```
Ahora que tenemos todos los componentes principales, modifica el PortfolioWizard.tsx para integrarlos correctamente y manejar la navegación entre ellos. Asegúrate de que los datos persistan entre pasos y se pueda reiniciar el proceso.
```

**Archivos adjuntos necesarios:**
- El componente PortfolioWizard.tsx actual
- Todos los componentes de pasos desarrollados (PortfolioBasics, RiskAssessment, CompanySelection, PortfolioAllocation, PortfolioSummary)
- El store de Zustand completo

### Prompt 29 - Configuración de i18n
```
Implementa un sistema completo de internacionalización para el Portfolio Manager usando react-i18next e i18next-browser-languagedetector. Necesito: detección automática del idioma del navegador, cambio de idioma en tiempo real, traducciones para español e inglés que incluyan todos los textos de la aplicación (incluidas fechas, números y monedas con formatos regionales), y un componente de selector de idioma en la interfaz. Organiza las traducciones en namespaces lógicos (ej: common, portfolio, risk) y asegúrate que todos los componentes usen las funciones de traducción correctamente.
```

**Archivos adjuntos necesarios:**
- `package.json` (para verificar las dependencias de i18next)
- Algunos de los componentes principales para mostrar cómo implementar las traducciones

### Prompt 30 - Estándares avanzados de UX
```
Implementa los más altos estándares de UX en el Portfolio Manager siguiendo estos principios: 1) Accesibilidad completa (WCAG AA) con manejo de foco, contrastes adecuados, textos alternativos y navegación por teclado; 2) Feedback visual e interactivo en todos los elementos (estados hover, focus, active, loading); 3) Microinteracciones y animaciones sutiles para mejorar la experiencia; 4) Patrones de diseño consistentes (formularios, tablas, navegación); 5) Manejo de estados vacíos, carga y error con mensajes claros; y 6) Diseño centrado en el usuario con tooltips explicativos y guías contextuales. Implementa también tests con usuarios simulados para validar la experiencia.
```

**Archivos adjuntos necesarios:**
- Algunos componentes clave para mostrar las mejoras de accesibilidad y UX
- Configuración de tema y diseño para trabajar con contrastes
- Componentes de animación y feedback generados anteriormente

### Prompt 31 - Mejoras de UX
```
Mejora la experiencia de usuario agregando: 1) Sistema completo de validación de formularios con feedback instantáneo y mensajes de error contextuales; 2) Persistencia del estado entre sesiones para no perder el progreso; 3) Confirmaciones visuales para acciones importantes con modales interactivos; 4) Estado de "portfolio creado con éxito" con animaciones atractivas y opciones claras para los siguientes pasos; 5) Sistema de ayuda contextual en cada paso del wizard; y 6) Analytics para seguimiento de uso y detección de points of friction. Asegúrate que todas estas mejoras funcionen correctamente en todos los tamaños de pantalla y en ambos modos de tema.
```

**Archivos adjuntos necesarios:**
- Componentes de formularios generados anteriormente
- El store de Zustand para implementar la persistencia
- Componentes de feedback (Toast, Alerts, Modales) generados anteriormente

### Prompt 32 - Optimización y Correcciones
```
Realiza una revisión exhaustiva del código para: 1) Optimizar el rendimiento con lazy loading, code splitting, memoización y reducción de re-renders; 2) Implementar testing (unit, integration, e2e) para asegurar la calidad; 3) Revisar y mejorar la accesibilidad (ARIA roles, keyboard navigation, screen readers); 4) Asegurar que el diseño responsivo funciona perfectamente en todos los breakpoints; 5) Verificar que el cambio de tema (light/dark) y de idioma funciona fluidamente; y 6) Implementar progressive enhancement para que la aplicación funcione incluso en condiciones sub-óptimas. Documenta también patrones de uso y mejores prácticas para el mantenimiento futuro.
```

**Archivos adjuntos necesarios:**
- Archivos principales del proyecto para análisis y optimización
- Cualquier configuración de testing existente
- `package.json` (para verificar dependencias de testing)

## Conclusión

Siguiendo estos prompts en orden, habrás desarrollado un Portfolio Manager completo con Next.js, React y una serie de herramientas modernas de desarrollo frontend. La aplicación incluirá todas las características necesarias para gestionar carteras de inversión de manera eficiente y visual, con una experiencia de usuario optimizada, soporte para múltiples idiomas y adaptación a diferentes tamaños de pantalla y preferencias de tema.

## Consejos para el Workshop

1. **Mantén el contexto**: Cursor funciona mejor cuando mantiene el contexto de la conversación. Evita iniciar conversaciones nuevas entre prompts relacionados.

2. **Revisa el código generado**: Después de cada prompt, tómate un momento para revisar y entender el código generado antes de continuar.

3. **Prepara los archivos adjuntos**: Ten listos todos los archivos necesarios antes de comenzar cada prompt para evitar interrupciones. En particular, asegúrate de tener disponibles los archivos de recursos corporativos de Singular Bank (fuentes, imágenes, CSS) para subirlos en el Prompt 5.

4. **Interactúa de manera efectiva**: Si el código generado no cumple exactamente con tus necesidades o no refleja correctamente la identidad de Singular Bank, puedes hacer preguntas aclaratorias o solicitar modificaciones específicas.

5. **Documenta mientras avanzas**: Toma notas sobre conceptos clave y decisiones de diseño a medida que avanzas en los prompts.

6. **Comparte el trabajo**: Si experimentas algún error o logras alguna mejora específica durante el workshop, compártelo con el grupo para que todos puedan beneficiarse.

7. **Mantén consistencia visual**: Revisa que todos los componentes mantengan la coherencia con la identidad visual de Singular Bank, especialmente en colores, tipografía y estilo general.