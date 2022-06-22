import React from 'react';

import { createRoot } from 'react-dom/client';
import './styles.css';

import App from "./App"
import { ArticleContextProvider } from './context/ArticleContext';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ArticleContextProvider component={<App/>} />
);