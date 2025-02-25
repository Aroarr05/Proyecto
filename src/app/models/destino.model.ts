export interface Coordenadas{
  lat: number;
  lng: number;
}

export interface Destino {
  id: number;
  nombre: string;
  coordenadas: Coordenadas; 
  ubicacion: string; 
  imagen: any;
}
