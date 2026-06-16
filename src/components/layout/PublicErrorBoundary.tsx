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
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Something went wrong
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            We apologize for the inconvenience. An unexpected error occurred while loading this page.
          </p>
          <Button onClick={() => window.location.href = '/'} className="gap-2">
            <Home className="h-4 w-4" />
            Return to Homepage
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
