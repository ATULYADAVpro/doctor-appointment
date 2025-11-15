import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Doctors />} />
        <Route path="/book" element={<BookAppointment />} />
      </Routes>
    </BrowserRouter>
  );
}
