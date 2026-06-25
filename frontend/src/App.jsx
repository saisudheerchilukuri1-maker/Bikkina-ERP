import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function ProtectedLayout({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />

        <Route
          path="/purchases"
          element={
            <ProtectedLayout>
              <Purchases />
            </ProtectedLayout>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedLayout>
              <Sales />
            </ProtectedLayout>
          }
        />

        <Route
          path="/expenses"
          element={
            <ProtectedLayout>
              <Expenses />
            </ProtectedLayout>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedLayout>
              <Reports />
            </ProtectedLayout>
          }
        />

       
<Route
  path="/settings"
  element={
    <ProtectedLayout>
      <Settings />
    </ProtectedLayout>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;