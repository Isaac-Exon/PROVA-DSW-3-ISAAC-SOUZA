import mongoose from "mongoose";
const { Schema } = mongoose;

// Esquema para Evento
const EventoSchema = new Schema(
  {
    titulo: {
      type: String,
      maxlength: [100, "O título pode ter no máximo 100 caracteres"],
      required: [true, "O título é obrigatório"],
    },
    descricao: {
      type: String,
      maxlength: [500, "A descrição pode ter no máximo 500 caracteres"], // Você pode ajustar o limite, se necessário
      default: null, // Opcional, portanto, pode ser nulo
    },
    data: {
      type: Date,
      required: [true, "A data é obrigatória"],
    },
    local: {
      type: String,
      maxlength: [200, "O local pode ter no máximo 200 caracteres"],
      required: [true, "O local é obrigatório"],
    },
    valor: {
      type: Number,
      min: [0, "O valor não pode ser negativo"],
      required: [true, "O valor é obrigatório"],
    },
  },
  { timestamps: true }
);

// Criação do modelo Evento
const Evento = mongoose.model("Evento", EventoSchema);

export default Evento;
