// Publicaciones del blog (contenido migrado desde la versión 1 en HTML).
// Cada bloque del "contenido" es un párrafo (p), un subtítulo (h2) o una lista (ul).
const blogs = [
  {
    id: 1,
    categoria: 'Vacunación',
    titulo: 'Calendario de vacunas para cachorros y gatitos',
    resumen:
      'Qué vacunas necesita tu mascota en sus primeros meses de vida y por qué es importante respetar los plazos entre dosis.',
    imagen: '/img/vacuna-antirrabica.jpg',
    alt: 'Aplicación de vacuna a una mascota en la clínica',
    contenido: [
      { tipo: 'p', texto: 'Las primeras semanas de vida son decisivas para la salud de tu mascota. Durante ese período, el sistema inmune de cachorros y gatitos todavía se está formando, por lo que un plan de vacunación bien llevado marca la diferencia entre prevenir una enfermedad grave o tener que tratarla más adelante.' },
      { tipo: 'h2', texto: '¿Por qué se aplican varias dosis?' },
      { tipo: 'p', texto: 'Los cachorros reciben anticuerpos de su madre a través de la leche materna, pero esa protección va disminuyendo con el tiempo y en un momento distinto para cada animal. Por eso las vacunas se aplican en dosis repetidas: si una primera dosis coincide con el período en que aún quedan anticuerpos maternos, es posible que no genere protección completa, y la siguiente dosis viene a cubrir ese margen.' },
      { tipo: 'h2', texto: 'Calendario general' },
      {
        tipo: 'ul',
        items: [
          '6 a 8 semanas: primera dosis de vacuna múltiple (óctuple en perros, triple o cuádruple felina en gatos).',
          '10 a 12 semanas: segunda dosis de la vacuna múltiple.',
          '14 a 16 semanas: tercera dosis de la vacuna múltiple y primera dosis antirrábica.',
          'Refuerzo anual: control y revacunación una vez completado el esquema inicial.',
        ],
      },
      { tipo: 'p', texto: 'Este calendario es una referencia general: tu médico veterinario puede ajustarlo según la especie, el estado de salud y el nivel de exposición de tu mascota a otros animales.' },
      { tipo: 'h2', texto: 'Recomendaciones antes y después de vacunar' },
      {
        tipo: 'ul',
        items: [
          'Lleva a tu mascota sana, sin fiebre ni diarrea, el día de la cita.',
          'Evita paseos por espacios con muchos animales hasta completar el esquema inicial.',
          'Es normal un poco de decaimiento o dolor leve en la zona de la inyección durante 24 a 48 horas.',
          'Consulta de inmediato si notas hinchazón en el rostro, vómitos o dificultad para respirar tras la vacuna.',
        ],
      },
    ],
  },
  {
    id: 2,
    categoria: 'Cirugía',
    titulo: 'Cuidados postoperatorios: cómo ayudar a tu mascota a recuperarse en casa',
    resumen:
      'Recomendaciones prácticas para la recuperación después de una cirugía, desde el reposo hasta el uso del collar isabelino.',
    imagen: '/img/cirugia-canina.jpg',
    alt: 'Perro en recuperación tras una cirugía en la clínica',
    contenido: [
      { tipo: 'p', texto: 'Ya sea una esterilización, una cirugía menor o un procedimiento más complejo, la recuperación en casa es tan importante como la cirugía misma. Un buen manejo durante los primeros días evita complicaciones como infecciones de la herida o que el punto se abra por movimientos bruscos.' },
      { tipo: 'h2', texto: 'Reposo y espacio' },
      { tipo: 'p', texto: 'Durante al menos los primeros 3 a 5 días, tu mascota debe mantenerse en un espacio tranquilo, sin subir a sillones ni bajar escaleras sin ayuda. Evita los saltos, las carreras y el juego con otras mascotas hasta que el médico veterinario confirme que la herida está cicatrizando bien.' },
      { tipo: 'h2', texto: 'Collar isabelino' },
      { tipo: 'p', texto: 'Lamer o morder la herida es una de las causas más frecuentes de infección y de puntos que se abren antes de tiempo. El collar isabelino, aunque incómodo al principio, cumple un rol clave: se debe mantener puesto todo el tiempo, incluso mientras come y duerme, hasta el retiro de los puntos.' },
      { tipo: 'h2', texto: 'Cuidado de la herida' },
      {
        tipo: 'ul',
        items: [
          'Revisa la herida una vez al día: debe verse limpia, sin mal olor ni secreción.',
          'No apliques cremas, alcohol ni productos caseros sin indicación veterinaria.',
          'Evita que la zona operada entre en contacto con agua hasta el retiro de los puntos.',
          'Contacta a la clínica si observas enrojecimiento marcado, hinchazón o secreción con mal olor.',
        ],
      },
      { tipo: 'h2', texto: 'Alimentación y medicamentos' },
      { tipo: 'p', texto: 'Es normal que el apetito esté disminuido el primer día. Ofrece porciones más pequeñas y agua fresca disponible en todo momento. Administra los analgésicos o antibióticos indicados en los horarios recomendados, respetando la dosis exacta indicada por el médico veterinario, y completa el tratamiento aunque tu mascota se vea recuperada antes de terminarlo.' },
    ],
  },
]

export default blogs
