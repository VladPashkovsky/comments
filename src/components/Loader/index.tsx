import React, { Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import styles from './style.module.css'

export function Loader({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className={styles.errorMessage}>
              There was an error using Suspense!
              <button className={styles.errorButton}
                      onClick={() => resetErrorBoundary()}
              >
                Try again
              </button>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className={styles.loader}>
                <div className={styles.loaderText}>
                  Loading...
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}