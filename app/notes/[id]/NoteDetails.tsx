import {fetchNotes} from "@/lib/api";
import { QueryClient,
  HydrationBoundary,
  dehydrate, } from "@tanstack/react-query";
import NoteDetailsClient from "../../notes/[id]/NoteDetailsClient";

type Props = {
  params: Promise<{ id: string, search: string, page: number, perPage: number,}>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
   const queryClient = new QueryClient();
   
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNotes(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;