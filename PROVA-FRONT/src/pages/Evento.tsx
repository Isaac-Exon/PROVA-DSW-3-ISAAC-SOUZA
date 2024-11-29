import { useState, useEffect } from "react";
import { Evento } from "../types/index"; // Importando o tipo
import api from "../services/api";

const EventoManager = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [local, setLocal] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchEventos = async () => {
    try {
      const response = await api.get<Evento[]>("/evento");
      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleSubmit = async () => {
    const eventoData: Omit<Evento, "_id"> = {
      titulo,
      descricao,
      data,
      local,
      valor: parseFloat(valor),
    };

    try {
      if (editing) {
        await api.put(`/evento/${editingId}`, eventoData);
        setMessage("Evento atualizado!");
      } else {
        await api.post("/evento", eventoData);
        setMessage("Evento criado!");
      }
    } catch (error) {
      console.error("Erro ao salvar evento", error);
    }

    setTitulo("");
    setDescricao("");
    setData("");
    setLocal("");
    setValor("");
    setEditing(false);
    setEditingId(null);
    fetchEventos();
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/evento/${id}`);
      setMessage("Evento deletado!");
      fetchEventos();
    } catch (error) {
      console.error("Erro ao deletar evento", error);
    }
  };

  const handleEdit = (evento: Evento) => {
    setTitulo(evento.titulo);
    setDescricao(evento.descricao);
    setData(evento.data.split("T")[0]);
    setLocal(evento.local);
    setValor(evento.valor.toString());
    setEditing(true);
    setEditingId(evento._id || null);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-3xl font-bold mb-6">Gerenciador de Eventos</h1>

        {message && (
          <div className="bg-green-500 text-white p-2 rounded-md mb-4">
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Descrição</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Local</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Valor</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {editing ? "Atualizar Evento" : "Criar Evento"}
        </button>
      </div>

      <div className="flex-col mx-4">
        <h2 className="text-2xl font-bold mb-4">Eventos Cadastrados</h2>
        <ul>
          {eventos.map((evento) => (
            <li
              key={evento._id}
              className="bg-white p-4 mb-4 shadow-md rounded-md flex justify-between items-center"
            >
              <div>
                <strong>{evento.titulo}</strong> -{" "}
                {evento.descricao || "Sem descrição"} <br />
                Local: {evento.local}, Data:{" "}
                {new Date(evento.data).toLocaleDateString()}, Valor: R$
                {evento.valor.toFixed(2)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(evento)}
                  className="bg-yellow-500 text-white p-1 rounded-md"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(evento._id!)}
                  className="bg-red-500 text-white p-1 rounded-md"
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventoManager;
