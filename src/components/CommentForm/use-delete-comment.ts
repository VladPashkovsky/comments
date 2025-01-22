import { useMutation } from '@tanstack/react-query'
import { commentApi } from './commentAPI.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { Comment } from '../../shared/models/types.ts'

export function useDeleteComment() {

  //Optimistic update:
  const deleteTodoMutation = useMutation({
    mutationFn: commentApi.deleteComment,
    onMutate: async (deletedId: string) => {
      await queryClient.cancelQueries({ queryKey: [commentApi.baseKey] })
      const previousComments = queryClient.getQueryData([commentApi.baseKey, 'list'])
      queryClient.setQueryData([commentApi.baseKey, 'list'], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((comment: Comment) => comment.id !== deletedId)
          }))
        }
      })

      return { previousComments }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([commentApi.baseKey, 'list'], context?.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [commentApi.baseKey] })
    },
  })


//Previous working version:
//   const deleteTodoMutation = useMutation({
//     mutationFn: commentApi.deleteComment,
//     async onSettled() {
//       await queryClient.invalidateQueries({ queryKey: [commentApi.baseKey] })
//     },
//     async onSuccess(_, deletedId) {
//       const comments = queryClient.getQueryData(
//         commentApi.getTodoListInfinityOptions(deletedId).queryKey,
//       )
//       if (comments) {
//         queryClient.setQueryData(
//           commentApi.getTodoListInfinityOptions(deletedId).queryKey,
//           // { ...todos, pages: todos.pages.map(page => ({ ...page, data: filteredTodos })) }
//           {
//             ...comments, pages: comments.pages.map(page =>
//               ({ ...page, data: page.data.filter((todo: Comment) => todo.id !== deletedId) })),
//           },
//         )
//       }
//     },
//   })

  return {
    handleDelete: (id: string) => deleteTodoMutation.mutate(id),
    isPending: (id: string) => deleteTodoMutation.isPending && deleteTodoMutation.variables === id,

    // handleDelete: deleteTodoMutation.mutate,
    // isPending: (id: string) => deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  }
}