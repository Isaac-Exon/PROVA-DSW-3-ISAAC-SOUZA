import { Router, Request, Response } from "express";

import eventoRoutes from "./Evento";
const routes = Router();

routes.use("/evento", eventoRoutes);

routes.use((_: Request, res: Response) =>
  res.status(404).json({ error: "Requisição desconhecida" })
);

export default routes;
