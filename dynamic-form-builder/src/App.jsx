import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// PAGES
import Pricing from "./pages/Pricing";
import EditForm from "./pages/EditForm";
import FormResponses from "./pages/FormResponses";

import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";
import MyForms from "./pages/MyForms";
import FormPreview from "./pages/FormPreview";
import Responses from "./pages/Responses";
import Analytics from "./pages/Analytics";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

// COMPONENTS
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT ROUTE */}
      
<Route
  path="/"
  element={<Navigate to="/signup" replace />}
/>
        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PROTECTED ROUTES */}

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route
          path="/create-form"
          element={
            <ProtectedRoute>
              <CreateForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-forms"
          element={
            <ProtectedRoute>
              <MyForms />
            </ProtectedRoute>
          }
        />

        <Route
          path="/form/:id"
          element={
            <ProtectedRoute>
              <FormPreview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responses"
          element={
            <ProtectedRoute>
              <Responses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/responses/:id"
          element={
            <ProtectedRoute>
              <FormResponses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-form/:id"
          element={
            <ProtectedRoute>
              <EditForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pricing"
          element={
            <ProtectedRoute>
              <Pricing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;