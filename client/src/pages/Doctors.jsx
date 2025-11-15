import { useEffect, useState } from "react";
import { API } from "../api";
import { doctorImage } from "../assets/photo";

export default function Doctors() {
    const [doctors, setDoctors] = useState([]);

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
    }, [])


    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Doctors List</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doc) => (
                    <div key={doc._id} className="border p-4 rounded shadow text-center">
                    <img src={doctorImage} alt="profile image" className="w-24 h-24 m-5 border rounded-full object-cover" />
                        <div className="text-start">
                            <h2 className="text-xl text-gray-700"> Doctor name:- {" "} <span className="font-semibold uppercase">{doc.name}</span></h2>
                            <p className="text-gray-700">Specialization: {" "} <span className="font-semibold uppercase"> {doc.specialization}</span></p>
                            <p className="text-gray-700">Consultation Fee: ₹ {doc.consultationFee}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
