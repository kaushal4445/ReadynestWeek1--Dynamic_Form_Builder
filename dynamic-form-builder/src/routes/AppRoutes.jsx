import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from "../pages/Pricing";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateForm from "../pages/CreateForm";
import MyForms from "../pages/MyForms";
import FormPreview from "../pages/FormPreview";
import Responses from "../pages/Responses";
import FormResponses from "../pages/FormResponses";
import EditForm from "../pages/EditForm";
import Analytics from "../pages/Analytics";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
  path="/pricing"
  element={<Pricing />}
/>

        {/* PROTECTED ROUTES */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

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

export default AppRoutes;