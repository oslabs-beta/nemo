import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./NavBar";
import MainContainer from "./MainContainer";

const queryClient = new QueryClient();

const App = () => {
  const [activeButton, setActiveButton] = useState(1);

  useEffect(() => {
    document.body.style.margin = "0";
  }, []);

  return (
    <div style={{ backgroundColor: "#081020", minHeight: "100vh" }}>
      <QueryClientProvider client={queryClient}>
        <Navbar setActiveButton={setActiveButton} />
        <MainContainer activeButton={activeButton} />
      </QueryClientProvider>
    </div>
  );
};

export default App;
