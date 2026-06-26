import type {Tag} from "../types/Tag";
import { URL } from "../api";

const API_URL = `${URL}/etiquetas`;

export async function obtenerTags(): Promise<Tag[]> {
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener las etiquetas");
  }

  const tags: Tag[] = await respuesta.json();

  return tags;
}

export async function obtenerTagPorId(id: string): Promise<Tag> {
  const respuesta = await fetch(`${API_URL}/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la etiqueta");
  }

  return await respuesta.json();
}