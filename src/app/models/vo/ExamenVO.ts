import { PreguntaVO } from '../vo/PreguntaVO';


export class ExamenVO {
    id: number;
    descripcion: string;
    total_preguntas: number;
    calificacion_minima: number;
    tiempolimite: string;
    preguntas: PreguntaVO[];

    constructor(
        id?: number,
        descripcion?: string,
        tiempolimite?: string,
        calificacion_minima?: number,
        total_preguntas?: number,
        preguntas?: PreguntaVO[]



    ) {}
}
