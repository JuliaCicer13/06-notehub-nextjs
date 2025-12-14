import axios from "axios";
import type { Note }from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface CreateNotePayload {
    id: string;
    title: string;
    content: string | null;
    tag: string;
  
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchNotes = async (
  id: string,
  search: string,
  page: number,
  perPage: number,

): Promise<FetchNotesResponse> => {
   await delay(2000);
   const response =  await axios.get<FetchNotesResponse>(BASE_URL,
    {
     params: {
      id,
      search,
      page,
      perPage,
     } ,
     headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
     },
    });
        return response.data;
}

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
    const response = await axios.post<Note>(
    BASE_URL,
    payload,
    {
       headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    },
  }
);
 return response.data;
};
export const deleteNote = async (noteId: string): Promise<Note> => {
    const response = await axios.delete<Note>(`${BASE_URL}/${noteId}`,{
          headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    }
  });
return response.data; 
}

type Props = {
  params: Promise<{ id: string }>;
};

const fetchNoteById = async ({ params }: Props) => {
  const { id } = await params;
  console.log('note id:', id);

};

export default fetchNoteById;