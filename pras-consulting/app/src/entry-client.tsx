import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App, NotFound } from './App';
import { initReveal } from './reveal';
import './index.css';

// One bundle serves both prerendered pages; the 404 marks itself on <body>.
const Page = document.body.dataset.page === '404' ? NotFound : App;

hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <Page />
  </StrictMode>,
);
requestAnimationFrame(initReveal);
