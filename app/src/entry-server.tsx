import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App, NotFound } from './App';
import { landing, site } from './content';

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );

export const renderNotFound = () =>
  renderToString(
    <StrictMode>
      <NotFound />
    </StrictMode>,
  );

export { landing, site };
