// import Link from 'next/link'

// export default function aaa() {
//     return (
//         <section className="bg-white shadow-inner dark:bg-gray-900">
//             <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
//                 <div className="mr-auto place-self-center lg:col-span-7">
//                     <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
//                         UniMusic Connect: ¡Encuentra, Conecta, Jamma!
//                     </h1>
//                     <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
//                         Conecta con estudiantes universitarios amantes de la música para formar bandas, 
//                         colaborar en proyectos y expandir tu red musical.
//                     </p>
//                     <Link href="/pageList" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
//                         Ver actividades
//                         <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
//                     </Link>
//                     <Link href="/registered/login" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
//                         Iniciar sesión
//                     </Link> 
//                 </div>
//                 <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
//                     <img src="/welcome.jpg" alt="welcome image" />
//                 </div>                
//             </div>
//         </section>
//     )
// }

// pages/activity/[id].js
// import fs from 'fs';
// import path from 'path';

// const ActivityDetails = ({ activity }) => {
//     return (
//         <div>
//             <h1>{activity.title}</h1>
//             <p>{activity.summary}</p>
//             {/* Agrega más detalles según sea necesario */}
//         </div>
//     );
// };

// export async function getStaticPaths() {
//     // Obtén los IDs de actividades desde pages.txt
//     const filePath = path.join(process.cwd(), 'data', 'pages.txt');
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const activities = JSON.parse(fileContents);

//     // Crea las rutas dinámicas
//     const paths = activities.map(activity => ({ params: { id: activity.id.toString } }));

//     return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//     // Obtén detalles de la actividad según el ID desde pages.txt
//     const filePath = path.join(process.cwd(), 'data', 'pages.txt');
//     const fileContents = fs.readFileSync(filePath, 'utf8');
//     const activities = JSON.parse(fileContents);

//     const activity = activities.find(act => act.id === params.id);

//     return {
//         props: {
//             activity,
//         },
//     };
// }

// export default ActivityDetails;