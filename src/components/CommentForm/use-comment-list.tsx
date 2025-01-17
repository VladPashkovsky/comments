import { useInfiniteQuery } from '@tanstack/react-query'
import {commentApi} from './commentAPI.ts'
import { useCallback, useRef } from 'react'

export function useCommentList() {
  const {
    data: commentItemsInfinite,
    error: errorInfinite,
    isLoading: isLoadingInfinite,
    isPlaceholderData: isPlaceholderDataInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchInfinite,
  } = useInfiniteQuery({
    ...commentApi.getTodoListInfinityOptions(),
  })

  const cursorRef = useIntersection(() => {
    fetchNextPage()
  })

  const cursor = (
    <div className="flex gap-2 mt-4" ref={cursorRef}>
      {!hasNextPage && <div>No more data</div>}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  )

  return { errorInfinite, commentItemsInfinite, isLoadingInfinite, cursor, refetchInfinite }
}

export function useIntersection(onIntersept: () => void) {
  const unsubscribe = useRef(() => {})
  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(intersection => {
        if (intersection.isIntersecting) {
          onIntersept()
        }
      })
    })
    if (el) {
      observer.observe(el)
      unsubscribe.current = () => observer.unobserve(el)
    } else {
      unsubscribe.current()
    }
  }, [])
}