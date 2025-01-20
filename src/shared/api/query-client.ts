import {QueryClient} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    // queries: {
    //   staleTime: 1000 * 60 * 1,
    //   gcTime: 24 * 60 * 60 * 1000,
    // }
  }
})