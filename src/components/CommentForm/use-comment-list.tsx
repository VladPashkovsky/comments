import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import { commentApi } from './commentAPI.ts'
import { useCallback, useRef } from 'react'
import { Comment, PaginatedResult } from '../../shared/models/types.ts'

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
    <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }} ref={cursorRef}>
      {!hasNextPage && <div>No more data</div>}
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  )

  return { errorInfinite, commentItemsInfinite, isLoadingInfinite, cursor, refetchInfinite }
}

function useIntersection(onIntersept: () => void) {
  const unsubscribe = useRef(() => {
  })
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