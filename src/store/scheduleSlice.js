import { createSlice, nanoid } from "@reduxjs/toolkit";

// 3 datos iniciales requeridos (reemplazan los datos fijos del LAB-03)
const initialState = {
  items: [
    {
      id: "b1",
      title: "Sistemas Móviles - LAB 04",
      course: "IF-1103",
      startTime: "08:00",
      endTime: "10:00",
      day: "Sábado",
      status: "pendiente", // "pendiente" | "completado"
      notes: "Implementar Redux Toolkit y AsyncStorage",
      createdAt: "2026-10-24T08:00:00.000Z",
    },
    {
      id: "b2",
      title: "Repaso de Algoritmos",
      course: "IF-0801",
      startTime: "10:30",
      endTime: "12:00",
      day: "Sábado",
      status: "completado",
      notes: "Estudiar grafos y árboles binarios",
      createdAt: "2026-10-24T10:30:00.000Z",
    },
    {
      id: "b3",
      title: "Lectura de Ingeniería de Software",
      course: "IF-0902",
      startTime: "14:00",
      endTime: "16:00",
      day: "Domingo",
      status: "pendiente",
      notes: "Capítulo 4: Patrones de arquitectura",
      createdAt: "2026-10-25T14:00:00.000Z",
    },
  ],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    // 1. Reducer CREAR con prepare (genera id único y timestamp serializable)
    addBlock: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare({ title, course, startTime, endTime, day, notes = "" }) {
        return {
          payload: {
            id: nanoid(),
            title,
            course: course || "General",
            startTime: startTime || "09:00",
            endTime: endTime || "10:00",
            day: day || "Hoy",
            status: "pendiente",
            notes,
            createdAt: new Date().toISOString(),
          },
        };
      },
    },

    // 2. Reducer ACTUALIZAR (modifica campos o el estado)
    updateBlock(state, action) {
      const { id, ...changes } = action.payload;
      const block = state.items.find((item) => item.id === id);
      if (block) {
        Object.assign(block, changes);
      }
    },

    // 3. Reducer ELIMINAR
    deleteBlock(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Reducer auxiliar para la hidratación desde AsyncStorage (Punto 6)
    hydrateBlocks(state, action) {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
      }
    },
  },
});

// Exportación de acciones
export const { addBlock, updateBlock, deleteBlock, hydrateBlocks } = scheduleSlice.actions;

// --- SELECTORES ---

// Selector de todos los bloques
export const selectAllBlocks = (state) => state.schedule.items;

// Selector por id
export const selectBlockById = (id) => (state) =>
  state.schedule.items.find((item) => item.id === id);

// Selector derivado 1: Conteo de bloques pendientes
export const selectPendingBlocksCount = (state) =>
  state.schedule.items.filter((item) => item.status === "pendiente").length;

// Selector derivado 2: Conteo de bloques completados
export const selectCompletedBlocksCount = (state) =>
  state.schedule.items.filter((item) => item.status === "completado").length;

export default scheduleSlice.reducer;