import { useEffect, useState } from "react";
import { API } from "../api";

export default function BookAppointment() {
    const [doctors, setDoctors] = useState([]);
    const [form, setForm] = useState({
        patientName: "",
        doctor: "",
        date: "",
        time: "",
    });

    const [error, setError] = useState("");

    const fetchDoctors = async () => {
        try {
            const res = await fetch(`${API}/doctor/doctors`);
            const data = await res.json();

            if (data.success) {
                setDoctors(data.doctors);
            }

        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        fetchDoctors()
    }, []);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALIDATIONS
        if (!form.patientName || !form.doctor || !form.date || !form.time) {
            setError("All fields are required!");
            return;
        }

        setError("");

        const res = await fetch(`${API}/appointment/add-appointment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        alert(data.message || "Appointment booked!");
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>

            {error && <p className="text-red-600 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />

                <select
                    name="doctor"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                >
                    <option>Select a Doctor</option>
                    {doctors.map((d) => (
                        <option key={d._id} value={d._id}>
                            {d.name} {" -- "} { d.specialization}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />

                <input
                    type="time"
                    name="time"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />

                <button className="bg-blue-600 text-white w-full p-2 rounded">
                    Book Appointment
                </button>

            </form>
        </div>
    );
}
