import { fetchNoteById } from "@/lib/api";
import { useParams } from 'next/navigation';
import { QueryClient, HydrationBoundary, dehydrate } from  "@tanstack/react-query";
import DetailsClient from "./NoteDetails.client";

export default async function NotePage () {
    const { id } = useParams<{ id: string }>();
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
   });

   return <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsClient/>
   </HydrationBoundary>
}