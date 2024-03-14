// pages/activity/[id].js
import fs from 'fs';
import path from 'path';

const ActivityDetails = ({ activity }) => {
    return (
        <div>
            <h1>{activity.title}</h1>
            <p>{activity.summary}</p>
            {/* Agrega más detalles según sea necesario */}
        </div>
    );
};

export async function getStaticPaths() {
    // Obtén los IDs de actividades desde pages.txt
    const filePath = path.join(process.cwd(), 'data', 'pages.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const activities = JSON.parse(fileContents);

    // Crea las rutas dinámicas
    const paths = activities.map(activity => ({ params: { id: activity.id.toString } }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    // Obtén detalles de la actividad según el ID desde pages.txt
    const filePath = path.join(process.cwd(), 'data', 'pages.txt');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const activities = JSON.parse(fileContents);

    const activity = activities.find(act => act.id === params.id);

    return {
        props: {
            activity,
        },
    };
}

export default ActivityDetails;