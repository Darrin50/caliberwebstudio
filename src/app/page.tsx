import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { ChatWidget, FloatingElements, InteractiveOrbs } from '@/components/ClientOnlyComponents';
import CinematicHero from '@/components/cinematic/CinematicHero';
import ProblemSlider from '@/components/cinematic/ProblemSlider';
import TransformationSection from '@/components/cinematic/TransformationSection';
import FeaturesGrid from '@/components/cinematic/FeaturesGrid';
import SocialProof from '@/components/cinematic/SocialProof';
import FinalCTA from '@/components/cinematic/FinalCTA';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <Nav />
      <CinematicHero />
      <ProblemSlider />
      <TransformationSection />
      <FeaturesGrid />
      <SocialProof />
      <FinalCTA />
      <Footer />
      <ChatWidget />
      <FloatingElements />
      <InteractiveOrbs />
    </main>
  );
}
