// scroll bar
import 'simplebar/src/simplebar.css';
import { Suspense } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import i18n from './utils/i18n';

// ----------------------------------------------------------------------

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading ...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </I18nextProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
