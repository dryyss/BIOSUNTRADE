import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './modules/App';
import { HomePage } from './modules/pages/HomePage';
import { ProductsPage } from './modules/pages/ProductsPage';
import { ContactPage } from './modules/pages/ContactPage';
import { ProductDetailPage } from './modules/pages/ProductDetailPage';
import { NotFoundPage } from './modules/pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'produits', element: <ProductsPage /> },
      { path: 'produits/:slug', element: <ProductDetailPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);


