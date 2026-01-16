import { HydrationBoundary, dehydrate, QueryClient } from  "@tanstack/react-query";
import Home from "../components/Home/Home";
import css from "../components/Home/Home.module.css";
import { fetchNotes } from "@/lib/api";

export default async function NotePage () {
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
        queryKey: ["notes"],
        queryFn: () => fetchNotes("", 1,12),
   });
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <main className={css.main}>
            <div className={css.container}>
               <Home/>
            </div>
          </main>
      </HydrationBoundary>
   )
}