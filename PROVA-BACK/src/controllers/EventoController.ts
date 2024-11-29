import { Request, Response } from "express";
import Evento from "../models/Evento";

class EventoController {
  // Criar um evento
  public async create(req: Request, res: Response): Promise<Response> {
    const { titulo, descricao, data, local, valor } = req.body;
    try {
      const novoEvento = new Evento({ titulo, descricao, data, local, valor });
      const eventoSalvo = await novoEvento.save();
      return res.status(201).json(eventoSalvo);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Erro ao cadastrar evento", error: error.message });
    }
  }

  // Listar todos os eventos ou pesquisar por título
  public async list(req: Request, res: Response): Promise<Response> {
    const { titulo } = req.query;
    try {
      let eventos;
      if (titulo) {
        eventos = await Evento.find({
          titulo: { $regex: titulo, $options: "i" }, // Pesquisa case-insensitive
        }).sort({ data: "asc" });
      } else {
        eventos = await Evento.find().sort({ data: "asc" });
      }
      return res.json(eventos);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar eventos", error: error.message });
    }
  }

  // Atualizar um evento
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { titulo, descricao, data, local, valor } = req.body;
    try {
      const eventoAtualizado = await Evento.findByIdAndUpdate(
        id,
        { titulo, descricao, data, local, valor },
        { new: true }
      );
      if (!eventoAtualizado) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      return res.json(eventoAtualizado);
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Erro ao atualizar evento", error: error.message });
    }
  }

  // Deletar um evento
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const eventoDeletado = await Evento.findByIdAndDelete(id);
      if (!eventoDeletado) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }
      return res.status(204).send();
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao deletar evento", error: error.message });
    }
  }
}

export const eventoController = new EventoController();
