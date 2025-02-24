export interface Destino {
  id: number;
  nombre: string;
  ubicacion: { lat: number; lng: number }; 
  ubicacionTexto: string; 
  imagen: string;
}
