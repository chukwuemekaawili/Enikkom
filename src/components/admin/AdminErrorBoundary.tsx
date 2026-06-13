import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class AdminErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
                    <div className="bg-destructive/10 p-4 rounded-full mb-4">
                        <AlertCircle className="h-10 w-10 text-destructive" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        The admin panel encountered an unexpected error.
                    </p>

                    {this.state.error && (
                        <div className="bg-muted p-4 rounded-lg text-left text-xs font-mono mb-6 max-w-2xl w-full overflow-auto">
                            <p className="font-semibold text-destructive mb-2">{this.state.error.message}</p>
                            <pre className="text-muted-foreground whitespace-pre-wrap">{this.state.errorInfo?.componentStack || this.state.error.stack}</pre>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                        <Button onClick={() => window.location.href = '/admin'}>
                            Back to Login
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
