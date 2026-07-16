import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class PublicErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in public UI:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <AlertCircle className="h-9 w-9 mb-5 text-destructive" aria-hidden="true" />
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            An unexpected error occurred while loading this page. Reloading usually fixes it.
          </p>
          <Button onClick={() => window.location.href = '/'} className="gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            Return home
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
