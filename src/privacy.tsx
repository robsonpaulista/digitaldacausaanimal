import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/montserrat/latin-800.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-700.css';
import './styles/global.css';
import { PrivacyPolicy } from './components/PrivacyPolicy';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <PrivacyPolicy />
    </StrictMode>,
  );
}
