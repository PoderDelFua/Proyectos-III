// pages/api/actividades/[id].js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { id } = req.query;

    const filePath = path.join(process.cwd(), 'data', 'pages.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading activities file' });
        }
        const activities = JSON.parse(data);
        const activity = activities.find(act => act.id === id);

        if (activity) {
            res.status(200).json(activity);
        } else {
            res.status(404).json({ message: 'Activity not found' });
        }
    });
}