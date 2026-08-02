import React, { Component, ErrorInfo, ReactNode } from 'react';
import { GoldButton } from './UI';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-6">
          <h2 className="text-3xl font-serif text-charcoal">Something went wrong</h2>
          <p className="text-charcoal/60 font-serif max-w-md">
            An unexpected visual or system anomaly occurred while rendering this section.
          </p>
          <GoldButton onClick={() => window.location.reload()} className="text-xs uppercase tracking-widest">
            Reload Application
          </GoldButton>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
