import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { store } from '../shared/redux.ts'
import { queryClient } from '../shared/api/query-client.ts'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { onlineManager } from '@tanstack/react-query'
import { Loader } from '../components/Loader'
import App from './App.tsx'
import './index.css'

// onlineManager.setOnline(navigator.onLine)

const persister = createSyncStoragePersister({
  storage: window.localStorage
})

createRoot(document.getElementById('root')!).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
    onSuccess={() => {
      queryClient.resumePausedMutations().then(() => {
        queryClient.invalidateQueries()
      })
    }}
  >
    <Provider store={store}>
      <StrictMode>
        <Loader>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Loader>
      </StrictMode>
    </Provider>
    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
  </PersistQueryClientProvider>
)
