import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Header />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default App;
