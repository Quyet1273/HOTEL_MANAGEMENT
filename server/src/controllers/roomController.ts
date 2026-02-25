import { Request, Response } from 'express';
import { RoomService } from '../services/roomService';

const roomService = new RoomService();

export class RoomController {
  async getAll(req: Request, res: Response) {
    try {
      const rooms = await roomService.getAll();
      res.json(rooms);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const room = await roomService.getById(req.params.id as string);
      res.json(room);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const room = await roomService.create(req.body);
      res.status(201).json(room);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const room = await roomService.update(req.params.id as string, req.body);
      res.json(room);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const result = await roomService.delete(req.params.id as string);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}