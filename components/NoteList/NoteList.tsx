"use client";

import css from "../NoteList/NoteList.module.css";
import type { Note } from "@/types/note";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {

  const queryClient = useQueryClient();
  
  const {mutate: deleteNoteM} = useMutation({
     mutationFn: (id: Note["id"]) => deleteNote(id),
     onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notes"]})
     }
})
       return (
  <ul className={css.list}>
	{notes.map((note) => (
     <li key={note.id}
         className={css.listItem}
        >
      <Link href={`/notes/${note.id}`}>
      <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
    </Link>
     <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>
      <button className={css.button} onClick={() => deleteNoteM(note.id)}>Delete</button>
    </div>
  </li>
  )
  )}
</ul>
       )
}