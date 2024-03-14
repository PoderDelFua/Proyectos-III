import { NextResponse } from "next/server";
import { readFileSync } from 'fs';
import path from 'path';

export async function GET(request, {params}) {
    const { id } = params;

    try {
        const filePath = path.join(process.cwd(), 'data', 'pages.txt');
        const fileContent = readFileSync(filePath, 'utf8');
        const activities = JSON.parse(fileContent);
        
        const activity = activities.find(act => act.id === id);
        if (!activity) {
            return NextResponse.json({ message: 'Activity not found', status: 404 });
        }
        
        return NextResponse.json(activity);
    } catch (e) {
        return NextResponse.json({
            message: 'Error obtaining activity',
            status: 500 
        });
    }
}
