import { useMutation } from '@tanstack/react-query'
import { commentApi } from './commentAPI.ts'
import { customAlphabet, nanoid } from 'nanoid'
import { queryClient } from '../../shared/api/query-client.ts'
import { Comment } from '../../shared/models/types.ts'

export function useCreateComment() {
  const createTodoMutation = useMutation({
    mutationFn: commentApi.createComment,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [commentApi.baseKey] })
    },
  })

  const handleCreate = (text: string) => {
    // console.log('Отправляемые данные:', { id: nanoid(10), text: text })
    createTodoMutation.mutate({
        id: nanoid(10),
        text: text.trim(),
      },
      {
        onSuccess() {
          // queryClient.invalidateQueries(todoListApi.getTodoListInfinityOptions())
          //   queryClient.invalidateQueries({
          //   queryKey: [todoListApi.baseKey],
          // })
        },
      })
    // e.currentTarget.reset()
  }

  // const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const formData = new FormData(e.currentTarget)
  //   const text = formData.get('text') as string ?? ''
  //
  //   // const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  //   // const nanoid = customAlphabet(alphabet, 10)
  //   console.log('Отправляемые данные:', { id: nanoid(10), text: text })
  //
  //   createTodoMutation.mutate({
  //       id: nanoid(10),
  //       text: text,
  //     },
  //     {
  //       onSuccess() {
  //         // queryClient.invalidateQueries(todoListApi.getTodoListInfinityOptions())
  //         //   queryClient.invalidateQueries({
  //         //   queryKey: [todoListApi.baseKey],
  //         // })
  //       },
  //     })
  //   e.currentTarget.reset()
  // }

  return {
    handleCreate,
    isPending: createTodoMutation.isPending,
  }
}