import api from "@/lib/apiClient/api";
import { endpoints } from "@/lib/apiClient/endpoint";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const res = await api.get(`${endpoints.getPersonalInfoById}${params.id}`);
    return NextResponse.json(res);
}