import type { Vertical } from './types';

/* ── Verticales (Servicios) · v3 ── (portado tal cual, en español) */
export const VERTICALS: Vertical[] = [
  {
    id: 'residences', title: 'Residencias privadas',
    sub: 'No son solo casas: son retratos en piedra, vidrio y luz.',
    intro: 'Una casa es el único proyecto donde el cliente vive dentro del resultado todos los días. Acá el control de escenas no es un extra: es el punto.',
    narr: {
      1: 'Leemos la casa antes de iluminarla: la paleta de materiales, la luz natural que recibe, las horas en que cada ambiente se usa de verdad.',
      2: 'Los planos residenciales cambian todo el tiempo, porque el cliente convive con la idea. Nosotros sostenemos la intención de luz en cada revisión.',
      3: 'Una casa se pone en marcha de noche, atenuada al nivel que la gente realmente usa.'
    }
  },
  {
    id: 'multifamily', title: 'Multifamiliar',
    sub: 'Del lobby al penthouse — una identidad, sostenida en cada espacio común.',
    intro: 'Una torre se compra en la entrada. Lobby, hall de ascensores, piso de amenidades y depto piloto tienen que hablar un solo idioma, y entregarse a tiempo.',
    narr: {
      1: 'Fijamos una identidad de luz para el edificio y probamos que se sostiene desde la marquesina hasta la terraza del último piso.',
      2: 'Lo multifamiliar vive de la coordinación: arquitectura, interiorismo, instalaciones, fachada. La gestión de cambios es la mayor parte del trabajo.',
      3: 'Los espacios comunes se ponen en marcha antes de la entrega a ventas, porque el lobby es la herramienta de venta.'
    }
  },
  {
    id: 'hospitality', title: 'Hotelería',
    sub: 'Confiabilidad a escala — igual en la noche cuatrocientos que en la primera.',
    intro: 'Consistencia en decenas de habitaciones idénticas y un momento con firma en cada espacio público. Las dos cosas a la vez, con el presupuesto de mantenimiento de un operador.',
    narr: {
      1: 'Diseñamos el recorrido del huésped como una secuencia de atmósferas, y el tipo de habitación una sola vez para que se repita perfecto.',
      2: 'Los operadores cambian el mobiliario a mitad de obra. Nosotros mantenemos el esquema de luz intacto.',
      3: 'Ponemos en marcha con el equipo de operaciones presente, para que el personal pueda sostener el esquema cuando nos vamos.'
    }
  },
  {
    id: 'commercial', title: 'Comercial',
    sub: 'Adaptabilidad — espacios que cambian de función entre que abren y cierran.',
    intro: 'La luz de retail tiene que mostrar el producto con honestidad y favorecer la arquitectura al mismo tiempo. Sobre una superficie reflectante, esos dos objetivos pelean.',
    narr: {
      1: 'Partimos de lo que el producto le hace a la luz — una carrocería refleja, un textil absorbe, el vidrio transmite — y diseñamos hacia atrás.',
      2: 'Los estándares de marca y la normativa local aplican a la vez. Los reconciliamos antes de que lleguen a obra.',
      3: 'Calibramos sobre la mercadería real, no sobre un piso vacío.'
    }
  },
  {
    id: 'cultural', title: 'Cultural y venues',
    sub: 'Llegada, circulación y atmósfera — todo lo que rodea al espectáculo.',
    intro: 'Un venue se ilumina para el movimiento y para el momento en que empieza el programa. La arquitectura tiene que ser legible a escala, y después dar un paso al costado.',
    narr: {
      1: 'Planificamos el venue como una secuencia: aproximación, ingreso, circulación, el espacio mismo, la salida de noche.',
      2: 'La programación cambia tarde y seguido. El esquema tiene que absorberlo.',
      3: 'Estamos en obra durante el montaje y durante el primer evento.'
    }
  },
  {
    id: 'aviation', title: 'Aviación',
    sub: 'De tierra al cielo — un ambiente personal a doce mil metros.',
    intro: 'En diseño aeronáutico la certificación es un factor clave. Cada componente necesita número de parte certificado y documentación completa, y todos los materiales deben cumplir normativa estricta de seguridad contra incendios.',
    narr: {
      1: 'Especificamos dentro del marco de certificación desde el primer boceto: peso, inflamabilidad, números de parte.',
      2: 'Cada elemento lo revisa y aprueba un experto en aviación antes de entrar a la cabina.',
      3: 'La puesta en marcha se hace sobre la aeronave, ajustada a la altura y a los husos horarios.'
    }
  },
  {
    id: 'yachts', title: 'Yates',
    sub: 'Sal, movimiento, y cero tolerancia al reflejo sobre el vidrio de noche.',
    intro: 'Un yate es una casa que se mueve por el ambiente más corrosivo del planeta. Todo lo que está cerca del mar abierto falla en algún momento: la pregunta es si falla en el año dos o en el doce.',
    narr: {
      1: 'Especificamos grado marino en todo y diseñamos asumiendo que de noche cada superficie es vidrio, brillo o agua.',
      2: 'Los cronogramas de astillero se mueven. El paquete de luz tiene que estar cuando el astillero está.',
      3: 'La puesta en marcha se hace en el mar, de noche, con la embarcación en movimiento.'
    }
  }
];
