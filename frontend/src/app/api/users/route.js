import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {
    try {
        const fileContent = readFileSync("data/users.txt");
        if (fileContent.length == 0) {
            return NextResponse.json([])
        }
        const users = JSON.parse(fileContent);
        return NextResponse.json(users);
    } catch (e) {
        return NextResponse.json({
            message: 'Error optaining users',
            status: 500 
        });
    }
}

export async function POST(request) {
    const data = await request.json();
    try {
        const fileContent = readFileSync("data/users.txt");
        if (fileContent.length == 0) {
            writeFileSync('data/users.txt', JSON.stringify([data]));
            return NextResponse.json({
                message: 'Creating a new user...',
                status: 200
            })
        }
        const users = JSON.parse(fileContent);
        writeFileSync('data/users.txt', JSON.stringify([...users, data]));
        return NextResponse.json({
            message: 'Creating a new user...',
            status: 200
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error creating a new user',
            status: 500,
        });
    }
}

export async function PUT(request) {
    const data = await request.json();
    try {
        const users = JSON.parse(readFileSync('data/users.txt'));
        const updatedUsers = users.map((user) =>
            user.id === data.id ? { ...user, ...data } : user
        );
        writeFileSync('data/users.txt', JSON.stringify(updatedUsers));
        return NextResponse.json({
            message: 'Updating the user...',
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error updating the user',
            status: 500,
        });
    }
}

export async function DELETE(request) {
    const data = await request.json();
    try {
        const users = JSON.parse(readFileSync('data/users.txt'));
        const updatedUsers = users.filter((user) => user.id !== data.id);
        writeFileSync('data/users.txt', JSON.stringify(updatedUsers));
        return NextResponse.json({
            message: 'Deleting the user...',
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error deleting the user',
            status: 500,
        });
    }
}