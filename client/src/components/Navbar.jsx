import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="font-bold text-xl">Appointment App</h1>

        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-200">Doctors</Link>
          <Link to="/book" className="hover:text-gray-200">Book</Link>
        </div>
      </div>
    </nav>
  );
}
