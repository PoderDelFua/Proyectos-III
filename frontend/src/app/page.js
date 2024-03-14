import Navbar from '@/components/Navbar';
import WelcomePage from '@/components/WelcomePage';

export default function Home() {
    return (
        <section>
            <div>
                <Navbar />
            </div>
            <div>
                <WelcomePage />
            </div>
        </section>
    );
};