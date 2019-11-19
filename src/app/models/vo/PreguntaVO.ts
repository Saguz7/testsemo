import { RespuestaVO } from '../vo/RespuestaVO';

export class PreguntaVO {
    id: number;
    descripcion: string;
    ruta: string;
    respuestas: RespuestaVO[];


    constructor(
        id?: number,
        descripcion?: string,
        ruta?: string,
        respuestas?: RespuestaVO[]

    ) {}
}
