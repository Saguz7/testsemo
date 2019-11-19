export class BuscarExamen {
    id: number;
    nombre: String;
    descripcion: String;
    total_preguntas: number;
    calificacion_minima: number;
    tiempo_limite: number;

    constructor(
      id?: number,
      nombre?: String,
      descripcion?: String,
      total_preguntas?: number,
      calificacion_minima?: number,
      tiempo_limite?: number
    ) {}
}
