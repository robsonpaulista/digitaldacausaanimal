import { About } from './components/About';
import { CastraMovel } from './components/CastraMovel';
import { Education } from './components/Education';
import { Faq } from './components/Faq';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowToHelp } from './components/HowToHelp';
import { Impact } from './components/Impact';
import { Pacto } from './components/Pacto';
import { Report } from './components/Report';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export function App() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Impact />
        <Pacto />
        <CastraMovel />
        <Report />
        <Education />
        <HowToHelp />
        <Faq />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
