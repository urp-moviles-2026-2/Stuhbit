import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "stuhbit/v1";

export async function cargarBloques() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.warn("Error al leer AsyncStorage", error);
    return null;
  }
}

export function suscribirPersistencia(store) {
  let ultimoEstado = store.getState().schedule.items;
  store.subscribe(() => {
    const estadoActual = store.getState().schedule.items;
    if (estadoActual !== ultimoEstado) {
      ultimoEstado = estadoActual;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(estadoActual)).catch((e) =>
        console.warn("Error al guardar en AsyncStorage", e)
      );
    }
  });
}