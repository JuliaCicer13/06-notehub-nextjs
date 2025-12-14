import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";


type Props = {
    params: Promise<{id: string}>;
};


const newFolder = async ({params}: Props) => {
    const {id} = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
       queryKey: ["note", id],
       queryFn: () => getSingleNote(id),
    })


    return (
        <>
          return 
          <HydrationBoundary state={dehydrate(queryClient)}>
           <NoteDetailsClient/>
          </HydrationBoundary>
        </>
    )
}
export default newFolder