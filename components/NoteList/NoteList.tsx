
import NoteItem from "../NoteItem/NoteItem";
import { Note } from "@/lib/api";


export type Props = {
 notes: Note[];
}

const NoteList = ({notes}: Props) => {
  return (
    <ul>
        {notes.map((note)=> (
            <NoteItem key={note.id} item={note}/>
        ))}
    </ul>
  );
}

export default NoteList;