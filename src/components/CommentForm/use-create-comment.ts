import { useMutation } from '@tanstack/react-query'
import { commentApi } from './commentAPI.ts'
import { nanoid } from 'nanoid'
import { queryClient } from '../../shared/api/query-client.ts'
import { useAppDispath } from '../../shared/redux.ts'
import { tasksSlice } from '../Tasks/tasks.slice.ts'

export function useCreateComment() {
  const dispatch = useAppDispath()
  const createTodoMutation = useMutation({
    mutationFn: commentApi.createComment,
    onSuccess: (data) => {
      dispatch(tasksSlice.actions.addTasks(data))
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [commentApi.baseKey] })
    },
  })

  const handleCreate = (text: string) => {
    createTodoMutation.mutate({
        id: nanoid(10),
        text: text.trim(),
      })
  }

  return {
    handleCreate,
    isPending: createTodoMutation.isPending, data: createTodoMutation.data
  }
}