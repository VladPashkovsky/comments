import { useMutation } from '@tanstack/react-query'
import { commentApi } from './commentAPI.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { Comment } from '../../shared/models/types.ts'

export function useDeleteComment() {
  const deleteTodoMutation = useMutation({
    mutationFn: commentApi.deleteComment,
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: [commentApi.baseKey] })
    },
    async onSuccess(_, deletedId) {
      const comments = queryClient.getQueryData(
        commentApi.getTodoListInfinityOptions(deletedId).queryKey,
      )
      if (comments) {
        // queryClient.setQueryData(
        //   todoListApi.getTodoListInfinityOptions().queryKey,
        //   todos.filter((todo: TasksDTO) => todo.id !== deletedId)
        // )

        // const filteredTodos = todos.pages.flatMap(page =>
        //   page.data.filter((todo: TasksDTO) => todo.id !== deletedId))

        queryClient.setQueryData(
          commentApi.getTodoListInfinityOptions(deletedId).queryKey,
          // { ...todos, pages: todos.pages.map(page => ({ ...page, data: filteredTodos })) }
          {
            ...comments, pages: comments.pages.map(page =>
              ({ ...page, data: page.data.filter((todo: Comment) => todo.id !== deletedId) })),
          },
        )
      }
    },
  })

  // const handleDelete = (id: string) => {
  //   deleteTodoMutation.mutate(id)
  // }

  return {
    handleDelete: deleteTodoMutation.mutate,
    isPending: (id: string) => deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  }
}