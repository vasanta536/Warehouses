import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" { interface Palette { black: Palette["primary"]; } interface PaletteOptions { black?: PaletteOptions["primary"]; } } declare module "@mui/material/Button" { interface ButtonPropsColorOverrides { black: true; } }

const theme = createTheme({ palette: { primary: { main: "#1976d2" }, // blue
                                     secondary: { main: "#dc004e" }, // pink/red 
                                     black: { main: "#000000" },
                                     info:{main:"#0dcaf0"}
                                    }, });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
  <Provider store={store}>
    <App />
  </Provider>
</ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
