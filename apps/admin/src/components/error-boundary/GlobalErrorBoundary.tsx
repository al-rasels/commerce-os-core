import React, { Component, type ErrorInfo } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Log to Sentry here in real app
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
          <div className="flex w-full max-w-md flex-col items-center justify-center rounded-xl border bg-card p-8 text-card-foreground shadow-sm text-center gap-4">
            <div className="rounded-full bg-destructive/10 p-3 text-destructive">
              <AlertTriangle className="size-8" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-destructive">
              Admin Portal Error
            </h1>

            <p className="text-sm text-muted-foreground">
              The system encountered an unexpected state. Support has been notified.
            </p>

            {import.meta.env.MODE !== 'production' && (
              <div className="w-full mt-4 rounded-md bg-muted p-4 text-left overflow-auto border">
                <pre className="text-xs text-muted-foreground m-0">
                  {this.state.error?.toString()}
                </pre>
              </div>
            )}

            <button
              onClick={this.handleRetry}
              className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 py-2"
            >
              <RefreshCcw className="size-4" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
