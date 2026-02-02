import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import store from './store';
import theme from './styles/muiTheme.ts';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>,
);

// Todo: check best practice for folder and file names and write notes for them
// Todo: Work on performance
// Todo: update linked in link
