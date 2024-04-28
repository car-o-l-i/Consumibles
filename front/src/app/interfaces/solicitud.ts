export interface Solicitud{
    departamento: string;
    consumible: string;
    cantidad: number;
    estado?: 'Pendiente' | 'En Proceso' | 'Completado'; // Solo puede tomar uno de estos valores
    fecha?: Date;
}