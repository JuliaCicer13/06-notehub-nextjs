import { fetchNotes } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate } from  "@tanstack/react-query";
import Home from "../components/Home/Home";

export default async function NotePage () {
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes("", 1, 12),
   });

   return <HydrationBoundary state={dehydrate(queryClient)}>
      <Home/>
   </HydrationBoundary>
}