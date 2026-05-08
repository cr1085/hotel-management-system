export interface Room {
  id: number;
  quantity: number;

  room_type: {
    id: number;
    name: string;
  };

  accommodation: {
    id: number;
    name: string;
  };
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  nit: string;
  total_rooms: number;

  rooms?: Room[];
}

export type RoomForm = {
  room_type: "ESTANDAR" | "JUNIOR" | "SUITE";
  accommodation: "SENCILLA" | "DOBLE" | "TRIPLE" | "CUADRUPLE";
  quantity: string;
};