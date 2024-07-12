import 'normalize.css';
import '../src/utils/styles/base.less';

import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import ReactDOM from 'react-dom/client';
import { store } from 'src/utils/redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import PageRoutes from 'src/routes';
import { Spin } from 'antd';

const persistor = persistStore(store);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate
            loading={
                <div className='loader-page'>
                    <Spin />
                </div>
            }
            persistor={persistor}
        >
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    maxSnack={1}
                >
                    <BrowserRouter>
                        <PageRoutes />
                    </BrowserRouter>
                </SnackbarProvider>
            </QueryClientProvider>
        </PersistGate>
    </Provider>
);
