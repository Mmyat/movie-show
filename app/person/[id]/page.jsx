'use client'
import api from "@/lib/apiClient/api";
import { endpoints } from "@/lib/apiClient/endpoint";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function PersonInfo( ) {
    const [person,setPerson] = useState({});
    const params = useParams();
    const router = useRouter();

    const getPersonalInfo = async () => {
        const res = await api.get(`${endpoints.getPersonalInfoById}${params.id}`);
        setPerson(res);
    };

    useEffect(() => {
        getPersonalInfo();
    },[]);

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="w-full items-center justify-center">
            <button className="bg-gray-200 py-2 px-4 rounded-lg cursor-pointer" onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
            </button>
            <div className="w-[500px] flex flex-col justify-center items-center" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <img
                    className="mb-4"
                    src={person?.profile_path ? `https://image.tmdb.org/t/p/w300${person.profile_path}` : "/placeholder.png"}
                    alt={person?.name || "No name"}
                    width={150}
                    height={200}
                    style={{ borderRadius: 8 }}
                />
                <h2 className="text-xl font-semibold mb-4">{person?.name || "Unknown"}</h2>
            <p className="w-full md:w-[500px] xl:w-[700px]"><strong>Also Known As:</strong> {(person?.also_known_as && person.also_known_as.length > 0) ? person.also_known_as.join(", ") : "N/A"}</p>
            <p className="w-full md:w-[500px] xl:w-[700px]"><strong>Birthday:</strong> {person?.birthday || "N/A"}</p>
            <p className="w-full md:w-[500px] xl:w-[700px]"><strong>Place of Birth:</strong> {person?.place_of_birth || "N/A"}</p>
            <p className="w-full md:w-[500px] xl:w-[700px]"><strong>Known For:</strong> {person?.known_for_department || "N/A"}</p>
            <p className="w-full md:w-[500px] xl:w-[700px]"><strong>Biography:</strong> {person?.biography || "N/A"}</p>
            </div>
        </div>
    );
}