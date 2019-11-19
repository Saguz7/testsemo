export class RespuestaVO {
    id: number;
    descripcion: string;
    correcto: boolean;
    id_pregunta: number;

    constructor(
        id?: number,
        descripcion?: string,
        correcto?: boolean,
        id_pregunta?: number

    ) {}
}
