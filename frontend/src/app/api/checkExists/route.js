import { NextResponse } from 'next/server'
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json()
    try{
        const fileContent = readFileSync("data/users.txt");

        if (fileContent.length == 0) {
            return NextResponse.json({
                message: "This user doesn't exists", 
                exists: false, 
                status: 200
            })
        }

        const users = JSON.parse(fileContent)
        const user = users.find(
            (u) => u.email === data.email
        );
        if (user) {
            if (user.password !== data.password) {
                return NextResponse.json({
                    message: "The password is incorrect", 
                    exists: true, 
                    passwordCorrect: false,
                    status: 200
                })
            } else {
                return NextResponse.json({
                    message: "This user already exists", 
                    exists: true, 
                    passwordCorrect: true,
                    userId: user.id,
                    status: 200
                })
            }
        } else {
            return NextResponse.json({
                message: "This user doesn't exists", 
                exists: false, 
                status: 200
            })
        }
    } catch(e){
        return NextResponse.json({
            message: "Error checking user existence", 
            status: 500
        })
    }
}