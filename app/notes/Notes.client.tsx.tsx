"use client";
import { fetchNotes } from "@/lib/api";
import type {Note} from "@/types/note"
import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import { useParams } from 'next/navigation';

const NoteDeatilsClient = () => {
   const [notes, setNotes] = useState<Note[]>([]);
   const { id } = useParams<{ id: string }>();

   const handleClick = async () => {
    const response = await fetchNotes(id);
    if (response?.notes) {
      setNotes(response.notes);
    }
  };

 return (
     <section>
      <h1>Notes List</h1>
      <button onClick={handleClick}>Get my notes</button>
      {notes.length > 0 && <NoteList notes={notes} />}
    </section>
 )
} 

export default NoteDeatilsClient