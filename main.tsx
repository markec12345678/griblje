import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { MuseumTrails } from './src/components/MuseumTrails';
import { museumRecords } from './src/data/museum';
import { museumTrails } from './src/data/trails';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <MuseumTrails trails={museumTrails} records={museumRecords} />
  </StrictMode>,
);
