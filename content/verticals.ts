import type { Vertical } from './types';

/* ── Verticales (Servicios) · v3 ── (portado tal cual, en español)
   `story` (A.4, brief 02): 3 párrafos EN JUEGO → EL OBSTÁCULO → LO QUE CAMBIA,
   más una línea `[DATO — …]` suelta donde aplique. Copy literal, no se reescribe. */
export const VERTICALS: Vertical[] = [
  {
    id: 'residences', slug: 'residencias-privadas', title: 'Residencias privadas',
    sub: 'No son solo casas: son retratos en piedra, vidrio y luz.',
    intro: 'Una casa es el único proyecto donde el cliente vive dentro del resultado todos los días. Acá el control de escenas no es un extra: es el punto.',
    narr: {
      1: 'Leemos la casa antes de iluminarla: la paleta de materiales, la luz natural que recibe, las horas en que cada ambiente se usa de verdad.',
      2: 'Los planos residenciales cambian todo el tiempo, porque el cliente convive con la idea. Nosotros sostenemos la intención de luz en cada revisión.',
      3: 'Una casa se pone en marcha de noche, atenuada al nivel que la gente realmente usa.'
    },
    story: [
      'Alguien vive acá todos los días. No es un espacio que se visita: es donde alguien desayuna a las siete y lee a las once de la noche.',
      'Una casa necesita ser dos casas distintas en el mismo día. Y nadie quiere aprender un tablero de dieciséis circuitos para conseguirlo. La mayoría de los proyectos residenciales falla ahí — no en la luminaria, en la cantidad de decisiones que le dejan al que vive adentro.',
      'Las escenas se componen antes de que la casa se entregue. El espacio llega completo con un solo gesto, y a la medianoche nadie se encuentra con un blanco de oficina.'
    ]
  },
  {
    id: 'multifamily', slug: 'multifamiliar', title: 'Multifamiliar',
    sub: 'Del lobby al penthouse — una identidad, sostenida en cada espacio común.',
    intro: 'Una torre se compra en la entrada. Lobby, hall de ascensores, piso de amenidades y depto piloto tienen que hablar un solo idioma, y entregarse a tiempo.',
    narr: {
      1: 'Fijamos una identidad de luz para el edificio y probamos que se sostiene desde la marquesina hasta la terraza del último piso.',
      2: 'Lo multifamiliar vive de la coordinación: arquitectura, interiorismo, instalaciones, fachada. La gestión de cambios es la mayor parte del trabajo.',
      3: 'Los espacios comunes se ponen en marcha antes de la entrega a ventas, porque el lobby es la herramienta de venta.'
    },
    story: [
      'El desarrollador vende el lobby. El comprador compra el departamento, pero decide en los primeros treinta segundos, y esos treinta segundos pasan en el hall.',
      'Una torre tiene que sostener una sola identidad desde la entrada hasta el penthouse, con presupuestos que cambian piso por piso. La repetición es la trampa: lo que se resuelve mal en una unidad se repite en [DATO — cantidad de unidades tipo de un proyecto real].',
      'Un solo criterio de luz para todo el edificio, con la escala de inversión puesta donde el ojo la registra. La identidad no depende de gastar lo mismo en todos lados.'
    ]
  },
  {
    id: 'hospitality', slug: 'hoteleria', title: 'Hotelería',
    sub: 'Confiabilidad a escala — igual en la noche cuatrocientos que en la primera.',
    intro: 'Consistencia en decenas de habitaciones idénticas y un momento con firma en cada espacio público. Las dos cosas a la vez, con el presupuesto de mantenimiento de un operador.',
    narr: {
      1: 'Diseñamos el recorrido del huésped como una secuencia de atmósferas, y el tipo de habitación una sola vez para que se repita perfecto.',
      2: 'Los operadores cambian el mobiliario a mitad de obra. Nosotros mantenemos el esquema de luz intacto.',
      3: 'Ponemos en marcha con el equipo de operaciones presente, para que el personal pueda sostener el esquema cuando nos vamos.'
    },
    story: [
      'El operador hereda tu proyecto y lo opera durante años. Tú entregas una vez; él lo mantiene todos los días.',
      'Las habitaciones tienen que verse iguales el día uno y el día mil. El problema no es especificar bien: es que el día que se quema una fuente, alguien la reemplaza con lo que hay en depósito. Ahí es donde los hoteles se van apagando de a poco, sin que nadie tome una decisión.',
      'Especificación pensada para el recambio, con el dossier que le permite al operador reponer sin degradar. La consistencia a escala no es un tema de diseño. Es un tema de documentación.',
      '[DATO — CRI mínimo especificado, o vida útil del sistema]'
    ]
  },
  {
    id: 'commercial', slug: 'comercial', title: 'Comercial',
    sub: 'Adaptabilidad — espacios que cambian de función entre que abren y cierran.',
    intro: 'La luz de retail tiene que mostrar el producto con honestidad y favorecer la arquitectura al mismo tiempo. Sobre una superficie reflectante, esos dos objetivos pelean.',
    narr: {
      1: 'Partimos de lo que el producto le hace a la luz — una carrocería refleja, un textil absorbe, el vidrio transmite — y diseñamos hacia atrás.',
      2: 'Los estándares de marca y la normativa local aplican a la vez. Los reconciliamos antes de que lleguen a obra.',
      3: 'Calibramos sobre la mercadería real, no sobre un piso vacío.'
    },
    story: [
      'Acá la luz no acompaña el espacio: vende el producto. Si el color no rinde, el producto no se ve como es, y el cliente lo nota antes de saber por qué.',
      'Hay que resolver rendimiento de color y normativa al mismo tiempo, y las dos cosas empujan en direcciones opuestas. El estándar de eficiencia te lleva a una fuente; el material del producto te lleva a otra.',
      'Se resuelve en el anteproyecto, no en la compra. Cuando la decisión de luz llega después del layout, lo único que queda es agregar luminarias — que es exactamente lo que hace que un local se vea barato.',
      '[DATO — CRI mínimo / normativa aplicable por mercado]'
    ]
  },
  {
    id: 'cultural', slug: 'cultural', title: 'Cultural',
    sub: 'Llegada, circulación y atmósfera — todo lo que rodea al espectáculo.',
    intro: 'Un venue se ilumina para el movimiento y para el momento en que empieza el programa. La arquitectura tiene que ser legible a escala, y después dar un paso al costado.',
    narr: {
      1: 'Planificamos el venue como una secuencia: aproximación, ingreso, circulación, el espacio mismo, la salida de noche.',
      2: 'La programación cambia tarde y seguido. El esquema tiene que absorberlo.',
      3: 'Estamos en obra durante el montaje y durante el primer evento.'
    },
    story: [
      'El evento pasa una vez. No hay segunda noche para corregir.',
      'Un venue tiene que funcionar para el que está en primera fila y para el que está al fondo, con público en movimiento y sin margen de prueba. Y todo lo que se instala se desinstala.',
      'Se diseña para la única noche que importa. Lo que en un proyecto permanente se ajusta en obra, acá se resuelve antes de que llegue el primer camión.'
    ]
  },
  {
    id: 'aviation', slug: 'aviacion', title: 'Aviación',
    sub: 'De tierra al cielo — un ambiente personal a doce mil metros.',
    intro: 'En diseño aeronáutico la certificación es un factor clave. Cada componente necesita número de parte certificado y documentación completa, y todos los materiales deben cumplir normativa estricta de seguridad contra incendios.',
    narr: {
      1: 'Especificamos dentro del marco de certificación desde el primer boceto: peso, inflamabilidad, números de parte.',
      2: 'Cada elemento lo revisa y aprueba un experto en aviación antes de entrar a la cabina.',
      3: 'La puesta en marcha se hace sobre la aeronave, ajustada a la altura y a los husos horarios.'
    },
    story: [
      'Nada entra sin certificar. No hay excepción, no hay equivalente, no hay «esto funciona igual».',
      'Cada componente tiene que estar aprobado para vuelo, con su peso, su tolerancia a vibración y su documentación. La lista de lo que se puede especificar es una fracción de lo que existe — y dentro de esa fracción hay que conseguir que el interior se vea como el interiorista lo dibujó.',
      'Trabajamos dentro de esa lista desde el primer día, no después de que el proveedor rechace la primera especificación.',
      '[DATO — certificación específica que aplica]'
    ]
  },
  {
    id: 'yachts', slug: 'yates', title: 'Yates',
    sub: 'Sal, movimiento, y cero tolerancia al reflejo sobre el vidrio de noche.',
    intro: 'Un yate es una casa que se mueve por el ambiente más corrosivo del planeta. Todo lo que está cerca del mar abierto falla en algún momento: la pregunta es si falla en el año dos o en el doce.',
    narr: {
      1: 'Especificamos grado marino en todo y diseñamos asumiendo que de noche cada superficie es vidrio, brillo o agua.',
      2: 'Los cronogramas de astillero se mueven. El paquete de luz tiene que estar cuando el astillero está.',
      3: 'La puesta en marcha se hace en el mar, de noche, con la embarcación en movimiento.'
    },
    story: [
      'La sal se lleva todo. Es cuestión de tiempo, y el tiempo es más corto de lo que cualquiera calcula.',
      'El acero inoxidable 316 encapsulado es el piso, no el techo. A eso se suma vibración constante, espacio de instalación mínimo y un mantenimiento que sucede en altamar. Una luminaria que falla en una casa se cambia; una que falla a bordo se convive con ella hasta puerto.',
      'Se especifica para el ambiente real, no para el catálogo. Grado marino de verdad, y una lista corta de fuentes a las que volvemos porque ya sabemos cómo envejecen.'
    ]
  }
];
