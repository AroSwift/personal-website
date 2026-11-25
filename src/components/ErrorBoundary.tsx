import React from 'react'
import { Button } from './ui/button'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
          <div className="max-w-md w-full text-center p-8 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
              Something went wrong
            </p>
            <h1 className="text-2xl font-semibold tracking-tight mb-3">
              Unable to load this page
            </h1>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              An unexpected error occurred while rendering. Reloading usually
              resolves this, especially right after a site update.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={this.handleReload} size="sm">
                Reload Page
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/">Go Home</a>
              </Button>
            </div>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
