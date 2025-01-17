import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import AppRouter from './AppRouter';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <AppRouter  />
    </Provider>
);

