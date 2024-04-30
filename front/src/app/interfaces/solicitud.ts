export interface Solicitud{
  departamento: string;
  consumible: string;
  cantidad: number;
  estado?: 'Pendiente' | 'Rechazado' | 'Aprobado'; // Solo puede tomar uno de estos valores
  fecha?: Date;

  // Propiedad para la lista de consumibles solicitados
  consumiblesSolicitados?: { consumible: string; cantidad: number }[];
}