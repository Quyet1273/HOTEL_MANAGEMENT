export type RoomType = 'single' | 'double' | 'suite';
export type RoomStatus = 'available' | 'occupied' | 'maintenance';

export interface Room {
  id: string;
  room_number: string;
  room_type: RoomType;
  price: number;
  status: RoomStatus;
  floor: number;
  capacity: number;
  amenities?: string[];
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateRoomDTO {
  room_number: string;
  room_type: RoomType;
  price: number;
  floor: number;
  capacity: number;
  status?: RoomStatus;
  amenities?: string[];
  image_url?: string;
}

export interface UpdateRoomDTO {
  room_number?: string;
  room_type?: RoomType;
  price?: number;
  floor?: number;
  capacity?: number;
  status?: RoomStatus;
  amenities?: string[];
  image_url?: string;
}