import { NextResponse } from "next/server"
import { readFileSync } from 'fs'

export async function GET(request, {params}) {
    const { userId } = params

    const fileContent = readFileSync("data/users.txt")
    const users = JSON.parse(fileContent)
    const user = users.find(
        (u) => u.id === userId
    )

    return NextResponse.json({
        data: user
    })
}