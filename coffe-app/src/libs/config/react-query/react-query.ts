import { DefaultOptions, QueryClient, QueryKey } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { ApiClient } from './request'

const defaultFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [endpoint, params, options] = queryKey as Array<string | Record<string, unknown>>
  const res = await ApiClient.get(endpoint as string, {
    params,
    ...(options as AxiosRequestConfig),
  })
  return res.data
}

const queryConfig: DefaultOptions = {
  queries: {
    queryFn: defaultFn,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
