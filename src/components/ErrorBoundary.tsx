'use client'

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 9v-3m0 0v-3m0 3h-3m3 0h3M21 21h3m0 0v3m0 0H12" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
          <p className="text-gray-500 mb-4">
            We encountered an error while loading this content.
          </p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}