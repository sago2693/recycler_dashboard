import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DashboardPage } from "./pages/Dashboard";
import { RecyclersListPage } from "./pages/Recyclers/RecyclersList";
import { RecyclerDetailPage } from "./pages/Recyclers/RecyclerDetail";
import { ProducersPage } from "./pages/Producers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/recyclers" element={<RecyclersListPage />} />
          <Route path="/recyclers/:id" element={<RecyclerDetailPage />} />
          <Route path="/producers" element={<ProducersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

