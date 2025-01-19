import { infiniteQueryOptions } from '@tanstack/react-query'
import { Comment, PaginatedResult } from '../../shared/models/types.ts'
import { jsonApiInstance } from '../../shared/api/api-instance.ts'

export const commentApi = {
  baseKey: 'comments',

  getTodoListInfinityOptions: () => {
    return infiniteQueryOptions({
      queryKey: [commentApi.baseKey, 'list'],
      // queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResult<Comment>>(`/comments?_page=${meta.pageParam}&_per_page=5`,
          { signal: meta.signal }),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      // getPreviousPageParam: (result) => result.prev,
      // select: result => result.pages.flatMap(page => page.data),
      select: result => result.pages.flat(),
    })
  },

  createComment: (data: Comment) => {
    return jsonApiInstance<Comment>(`/comments/add`, {
      method: 'POST',
      json: data,
    })
  },

  deleteComment: (id: string) => {
    return jsonApiInstance(`/comments/remove/${id}`, {
      method: 'DELETE',
    })
  },
}