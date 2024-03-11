import { NextResponse } from "next/server"
const BACKEND_URL = "http://localhost:9000/api";

export async function GET(request, {params}) {
    const { userId } = params

    const userResponse = await fetch(`${BACKEND_URL}/usuario/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const user = await userResponse.json()
    console.log(user)

    /// ESTA PAGINA HAY QUE IMPLEMENTARLA; POR AHORA ESTA ASÍ PORQUE TENGO QUE VER COMO HACER EL MIDDLEWARE
}