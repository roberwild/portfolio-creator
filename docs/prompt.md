## Prompts

<!-- Una vez generado el proyecto desde Vercel y Supabase haremos git clone del repo generado, y desde la carpeta abrimos Cursor, e interactuamos con el chat de IA -->

Necesito  inicializar el proyecto y la instalación

<!-- Ojo hay que vigilar que no implemente nada ni que mezcle instaladores de paquetes -->

´´´

Necesitamos crear la documentación base para un proyecto de creación de portfolios de inversión. El objetivo final es mostrar una cartera de ejemplo en la que hemos realizado el análisis del perfil de riesgo del cliente, el cliente ha podido seleccionar empresas o limitar aquellas que no quiere incluir en el portfolio, ya sea nombrándolas directamente o por un determinado parámetro o sector, una vez seleccionadas las empresas, el cliente podrá escoger cuántas acciones o qué distribución hará de cada una de ellas de tal modo que su portfolio esté diversificado, finalmente se le enseñará un resumen del resultado final de la cartera creada.

NO IMPLEMENTES NADA Y HAZME PREGUNTAS DE CARA A MEJORAR ESTA IDEA INICIAL, ESTAMOS PENSANDO EN EL MVP
´´´

### Cuestionario

Preguntas para mejorar la propuesta inicial
Sobre los usuarios
¿Cuál es el perfil de usuario objetivo? (¿Inversores novatos, experimentados, o ambos?)
AMBOS
¿El análisis del perfil de riesgo será a través de un cuestionario o entrevista? ¿Qué parámetros considerarás para determinar su tolerancia al riesgo?
CUESTIONARIO SENCILLO
Sobre la selección de empresas
¿Qué fuentes de datos utilizarás para obtener información sobre las empresas disponibles?
UTILIZA DATOS MOCKUP
¿Qué criterios de filtrado planeas ofrecer? (sectores, capitalización, dividendos, ESG, etc.)
CONSIDERA UN FILTRADO BÁSICO
¿Cuántas empresas como máximo podrá incluir un usuario en su portfolio?
20 POR AHORA
Sobre la diversificación y distribución
¿Ofrecerás recomendaciones automáticas de distribución basadas en el perfil de riesgo?
SÍ, MÁS ADELANTE
¿Permitirás al usuario establecer porcentajes o número de acciones específicas?
AMBOS, PERO TENIENDO EN CUENTA NO PODER COMPRAR ACCIONES DIVIDIDAS, POR LO TANTO, TENDRÁ EN CUENTA EL EFECTIVO DISPONIBLE EN LA CUENTA DEL CLIENTE Y PUEDE QUE HAYA UN SOBRANTE
¿Incluirás alertas o advertencias cuando el portfolio no esté suficientemente diversificado?
POR SUPUESTO
Sobre el resumen final
¿Qué métricas mostrarás en el resumen? (rendimiento histórico, volatilidad esperada, correlaciones, etc.)
LAS MÁS IMPORTANTES PARA UN INVERSOR MEDIO
¿Ofrecerás una comparativa con algún índice de referencia?
SÍ, LOS MÁS IMPORTANTES COMO SP500 Y NASDAQ
¿Permitirás al usuario descargar un informe del portfolio creado?
EN PDF Y EXCEL
Sobre la tecnología y experiencia de usuario
¿Estás pensando en una aplicación web, móvil o ambas?
AMBAS
¿Necesitarás integración con brokers o será solo para fines informativos?
POR AHORA MOCKUP
¿Planeas incluir visualizaciones (gráficos, tablas) para ayudar en la toma de decisiones?
POR SUPUESTO
Sobre el modelo de negocio
¿Cómo planeas monetizar este servicio? (suscripción, freemium, comisiones, etc.)
NO EN EL MVP
¿Qué ventajas competitivas tendría tu solución frente a las existentes en el mercado?
NONE
Estas preguntas nos ayudarán a definir mejor los límites y alcance del MVP, así como a identificar los posibles desafíos técnicos y de negocio que podríamos enfrentar durante su desarrollo.

GENERA DE NUEVO EL DOCUMENTO QUE CONSOLIDE LA BASE DE LA SOLUCIÓN QUE QUEREMOS IMPLEMENTAR, NO IMPLEMENTES NADA NI ESPECIFIQUES TODAVÍA NADA DEL ASPECTO TECNOLÓGICO O STACK

### librerías?

voy a desarrollar un proyecto en nextjs y supabase, además utilizamos react, tailwind... mira el package.json

me gustaria utilizar recharts, shadcdn, y otros, pero....

qué se te ocurre a ti

----segundo prompt de esta serie ---

me gusta react-hook-form, recharts, zustand, react-query de tanstack, date-fns, uuid, react-table de tanstack, para la internacionalización me gusta i18n, zod

genera una lista de snippets bash independientes para cada una de ellas, y al final sigue proponiendo más tecnologías que nos puedan ser útiles

NO IMPLEMENTES NADA

## primer front


Utilizando faker para generación de datos mockup, genera un front de ejemplo para una creación de portfolio hecho por fases con muy buena experiencia de usuario

la interfaz ha de ser moderna, responsiva y siguiendo buenas prácticas de UX

la experiencia de usuario para la creación de portfolios será siguiendo un wizard paso a paso, sencillo y amigable

NO IMPLEMENTES NADA DE BACK END
GENERA PRIMERO UNA ESTRUCTURA DE CARPETAS Y FICHEROS QUE SEA CONSISTENTE CON NUESTRO PROYECTO NEXTJS CON SUPABASE

EN EL FUTURO, PROTEGEREMOS LAS RUTAS DE LAS PÁGINAS DE CREACIÓN DE PORTFOLIO MOSTRANDOLO SOLO A USUARIOS AUTENTICADOS, PERO POR AHORA PUEDEN SER PÚBLICAS

NO SOBREIMPLEMENTES Y USA EL DOCUMENTO BASE COMO IDEA INICIAL

ANTES DE IMPLEMENTAR EL FRONT, HAZME PREGUNTAS PREVIO A LA IMPLEMENTACIÓN QUE HAREMOS UNA VEZ TE LAS RESUELVA

Estructura de navegación: ¿Prefieres que el wizard de creación de portfolio sea una única ruta con diferentes estados/pasos, o múltiples rutas (una por paso)?
diferentes estados, una única ruta, pero el usuario podrá retomar dicha creación si un portfolio se queda en modo draft borrador
Tema y estilo visual: ¿Tienes preferencia por algún esquema de colores específico? Veo que estás usando next-themes, ¿debería implementar soporte para modo claro/oscuro?
next themes, modo claro / oscuro
Localización: Noto que tienes i18next en tus dependencias.
¿Necesitas soporte para múltiples idiomas desde el inicio?
si
Dispositivos objetivo: ¿Hay algún tipo específico de dispositivo que debería priorizar (móvil, tablet, desktop)?
movil y desktop
Nivel de detalle en las visualizaciones: En la parte de análisis, ¿qué tan complejas deberían ser las visualizaciones? ¿Prefieres gráficos sencillos o visualizaciones más elaboradas?
un equilibrio
Almacenamiento de estado: Para mantener los datos entre pasos del wizard, ¿prefieres que use estado local (React), Zustand (que veo en tus dependencias), o alguna otra solución específica?
zustand y compatibilidad con supabase para guardar el draft, quizás necesitemos crear un modelo de datos en prisma, pero lo haremos después una vez finalizado el front
Autenticación: Aunque mencionas que por ahora las rutas pueden ser públicas, ¿debería preparar la estructura teniendo en cuenta la futura autenticación?
decide tú mismo la mejor opción de cara al futuro
Componentes UI: Observo que estás usando varios componentes de Radix UI. ¿Hay alguna preferencia específica sobre qué componentes utilizar para elementos como formularios, selección, etc.?
utiliza los componentes que sean más útliles, ejemplo react hook forms
Perfil de riesgo: ¿Tienes ya definidas las preguntas específicas para el cuestionario de perfil de riesgo, o debo generarlas?
genera pregutnas para el análisis de perfil de riesgo, que podamos en un futuro ampliar
Datos de empresas: ¿Cuántas empresas mock debería generar para la demostración? ¿Hay sectores o tipos de empresas específicos que quieras ver representados?
genera empresas americanas y españolas, de distintos sectores, con unas 50 empresas de ejemplo nos podría valer, los datos intenta que sea realistas pero sin que tampoco sea esto una complicacionå©å

## IMPLEMENTACIÓN PRIMER PORTFOLIO CREATOR


Todo lo anterior es un buen ejemplo de lo que necesitamos para la implementación de nuestro creador de portfolios, lo cual será un servicio más ya que en el futuro, la plataforma tendrá más funcionalidades para los clientes ( por ejemplo, ver la situación global de carteras o de liquidez)

Por tanto, ahora sí, implementa el creador de portfolios del cual hemos generado el código anteriormente y pude ya revisar, acepto que hagas mejoras siempre y cuando no sobrecompliques la implementación con nuevas funcionalidades pero mejorando la eficiencia de lo ya propuesto, es decir, solo mejoras con impacto sobre lo actual para la funcionalidad YA propuesta.

En resumen: refactoriza y optimiza el código del creador de portfolios manteniendo su alcance funcional intacto, con el objetivo de hacerlo más robusto y eficiente.

Genera primero los ficheros y carpetas necesarios, recuerda que usamos next.js con supabase y prisma. Solo implementa front end!

## look and feel

mejora el look and feel y algunos textos no están bien contrastados en nuestro creador de portfolios

para el creador de portfolios genera un modal de información sobre la utilidad antes de empezar, quizás incluso como el primer paso integrado dentro del propio progreso, haz que sea bonito y pensado en ux

en el resumen del portfolio utiliza también recharts para representar mediante pie chart el allocation del portfolio

utilizando recharts, muestra gráficos que ayuden a diversificar el portfolio mediante la muestra de piecharts que representen:
allocation
sectores globales para los tickers seleccionados
mercados de procedencia de los tickers seleccionados

Quiero un icono de candado que pueda estar cerrado o abierto.
Si está cerrado y modifico la asignación de cualquier otra empresa, el resto de las empresas que estén desbloqueadas reducirán su asignación para dejar espacio a la nueva asignación en la empresa que estamos modificando.

Por defecto, todas están desbloqueadas, así que todas ceden espacio para nuevas asignaciones.

Cada nueva asignación (al mover cualquier slider) debe ser compatible con el monto total de dinero asignado al portfolio.

El sistema de bloqueo para la asignación del portfolio funciona cuando necesitamos espacio de la asignación de otras empresas, pero si deslizo en sentido inverso, me gustaría que esas empresas aumentaran su asignación de forma equitativa para mantener la asignación total del portfolio.

Integra la última respuesta en nuestro diseño global, pero no pierdas la estética, solo mantén los colores y las fuentes.

Incluir un selector de modo noche y modo claro en el encabezado.

Reduce un poco los bordes redondeados para que sean más cuadrados, y no incluyas subrayado en los textos dentro de los botones.

Incluye el logo donde sea adecuado para una mejor imagen corporativa, pero considerando la experiencia de usuario (UX), también ten un buen fondo para páginas de inicio u otras que puedan tener un fondo decorativo.
Considera usar filtros CSS con esas imágenes para lograr una mejor coherencia en el diseño.

Crea un nuevo README ya que ya hemos implementado un proyecto diferente a partir de ese boilerplate.

Revisa toda la landing page y sus componentes, y evalúa si el contenido es adecuado o si deberíamos cambiar algo. Piensa en todo el contenido en conjunto y en cómo presentar nuestro producto de la mejor manera posible para nuevos clientes potenciales, evitando confusión, redundancias o saturación.
