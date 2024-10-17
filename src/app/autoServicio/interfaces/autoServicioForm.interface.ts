

export interface autoServiceForm {
    nombre: string;
    altura: number | null;
    ancho: number | null;
    longitud: number | null;
    metros: number;
    pesos: number;
}


export interface autoServiceComprobante {
    orden?: string;
    fecha: string;
    hora: string;
    nombre: string;
    altura: number | null;
    ancho: number | null;
    longitud: number | null;
    metros: number;
    pesos: number;
}