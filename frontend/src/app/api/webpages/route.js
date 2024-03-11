import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function GET() {
    try {
        const fileContent = readFileSync("data/pages.txt");
        if (fileContent.length == 0) {
            return NextResponse.json([])
        }
        const pages = JSON.parse(fileContent);
        return NextResponse.json(pages);
    } catch (e) {
        return NextResponse.json({
            message: 'Error optaining pages',
            status: 500 
        });
    }
}

export async function POST(request) {
    const data = await request.json();
    try {
        const fileContent = readFileSync("data/pages.txt");
        if (fileContent.length == 0) {
            writeFileSync('data/pages.txt', JSON.stringify([data]));
            return NextResponse.json({
                message: 'Creating a new webpage...',
                status: 200
            })
        }
        const pages = JSON.parse(fileContent);
        writeFileSync('data/pages.txt', JSON.stringify([...pages, data]));
        return NextResponse.json({
            message: 'Creating a new webpage...',
            status: 200
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error creating a new webpage',
            status: 500,
        });
    }
}

export async function PUT(request) {
    const data = await request.json();
    try {
        const pages = JSON.parse(readFileSync('data/pages.txt'));
        const updatedPages = pages.map((page) =>
            page.id === data.id ? { ...page, ...data } : page
        );
        writeFileSync('data/pages.txt', JSON.stringify(updatedPages));
        return NextResponse.json({
            message: 'Updating the page...',
        });
    } catch (e) {
        return NextResponse.json({
            message: 'Error updating the page',
            status: 500,
        });
    }
}

// export async function DELETE(request) {
//     const data = await request.json();
//     try {
//         const users = JSON.parse(readFileSync('data/users.txt'));
//         const updatedUsers = users.filter((user) => user.id !== data.id);
//         writeFileSync('data/users.txt', JSON.stringify(updatedUsers));
//         return NextResponse.json({
//             message: 'Deleting the user...',
//         });
//     } catch (e) {
//         return NextResponse.json({
//             message: 'Error deleting the user',
//             status: 500,
//         });
//     }
// }