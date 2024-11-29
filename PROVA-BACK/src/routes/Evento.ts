import { Router } from "express";
import { eventoController } from "../controllers/EventoController";

const router = Router();

// Rotas para Evento
router.post("/", eventoController.create); // Adicionar um novo evento
router.get("/", eventoController.list); // Listar todos os eventos ou pesquisar por título
router.put("/:id", eventoController.update); // Atualizar um evento
router.delete("/:id", eventoController.delete); // Remover um evento

export default router;
