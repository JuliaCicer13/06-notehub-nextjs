import { fetchNotes } from "@/lib/api";
import { useState } from 'react'
import css from '../App/App.module.css'
import SearchBox from "@/components/SearchBox/SearchBox";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import NoteForm from '@/components/NoteForm/NoteForm';
import Modal from "@/components/Modal/Modal";
import NoteList from '@/components/NoteList/NoteList';
import {Toaster} from "react-hot-toast";
import Pagination from '@/components/Pagination/Pagination';
import { useParams } from 'next/navigation';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const perPage = 12;
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleSearch = useDebouncedCallback(
    (value:string) => {
    setSearchQuery(value);
    setPage(1);
   },
    500
  );

  const { id } = useParams<{ id: string }>();

  const { data, isSuccess} = useQuery({
    queryKey: ['notes', search, page, id],
    queryFn: () => fetchNotes(search, page, perPage,id),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
   

    const results = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;

return (
 <div className={css.app}>
  <header className={css.toolbar}>
    <SearchBox value={search} onChange={handleSearch}/>

    {isSuccess && totalPages > 1 && (
      <Pagination
        totalPages={totalPages}
        page={page}
        setPage={setPage}
      />
    )}
    <button onClick={openModal} className={css.button}>Create note +</button>
  </header>
    {isSuccess && results.length > 0 && ( <NoteList notes={results}/>)}
     <Toaster position="top-right" reverseOrder={false}/>
     {isModalOpen && (<Modal onClose={closeModal}>
      <NoteForm onSuccess={closeModal}/>
     </Modal>
     )}
</div>
   
  )
}