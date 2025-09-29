import FormBuilder from "./components/FormBuilder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import AllForms from "./components/AllForms";
import FillForm from "./components/FillForm";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FirstPage from "./components/FirstPage";
import Dashboard from "./components/Dashboard";
import CreatedForms from "./components/CreatedForms";
import DragDropFormBuilder from "./components/DragDropFormBuilder";
import AdminDashboard from "./components/AdminDashboard";


function App() {
  return (
    <>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard /> }/>
            <Route path="/" element={<FirstPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/formBuilder" element={<FormBuilder />}></Route>
            <Route path="/all-forms" element={<AllForms />} />
            <Route path="/fill-form/:formId" element={<FillForm />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/created-forms" element={<CreatedForms />} />
            <Route path="/dragdrop-form" element={<DragDropFormBuilder />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          
          </Routes>
        </DndProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
