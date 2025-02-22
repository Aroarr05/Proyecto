export interface Reserva{
  id: number;
  cliente:{nombre: string; email:string};
  fechaViaje: string;
  numPersonas: number;
  destinoId: number;

}