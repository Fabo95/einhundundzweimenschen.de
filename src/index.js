import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {Provider} from "react-redux"
import { createRoot } from 'react-dom/client';

import App from './App';
import { store } from "./redux";
import {loadAllArticles} from "./redux/articleData"
import {loadAllComments} from "./redux/commentData";
import { commonButtonTheme } from "./theme/commonButtonTheme";

import './styles.css';

const render = () => {
    console.log("index ran")

    store.dispatch(loadAllArticles())
    store.dispatch(loadAllComments())

    const container = document.getElementById('root');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(
        <Provider store={store}>
            <ThemeProvider theme={commonButtonTheme}>
                <App />
            </ThemeProvider>
        </Provider>
    );
}

render()