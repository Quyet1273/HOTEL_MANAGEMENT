import { supabase } from '../config/supabase';
import { CreateRoomDTO, UpdateRoomDTO } from '../types/room';

export class RoomService {
  async getAll() {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async create(payload: CreateRoomDTO) {
    const { data, error } = await supabase
      .from('rooms')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, payload: UpdateRoomDTO) {
    const { data, error } = await supabase
      .from('rooms')
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { message: 'Room deleted successfully' };
  }
}