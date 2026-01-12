import axios from "axios";
import type { Note }from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface CreateNotePayload {
    title: string;
    content: string | null;
    tag: string;
  
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,

  },
});



export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number
) : Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("", {
    params: {
      search,
      page,
      perPage,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/${id}`);
  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await api.post<Note>("", payload);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await api.delete<Note>(`/${noteId}`);
  return response.data;
}
