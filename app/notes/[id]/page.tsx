import { fetchNoteById } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from  "@tanstack/react-query";
import DetailsClient from "./NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NotePage ({ params }: Props) {
   const {id} =  await params;
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
   });

   return <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsClient/>
   </HydrationBoundary>
}