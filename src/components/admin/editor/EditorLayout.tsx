import React from 'react';
import { cn } from '@/lib/utils';

interface EditorLayoutProps {
    header: React.ReactNode;
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    children: React.ReactNode; // Center (Preview)
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({
    header,
    leftPanel,
    rightPanel,
    children
}) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            {/* Header */}
            <header className="h-16 border-b flex items-center px-4 bg-card z-10 shrink-0">
                {header}
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: Navigator / Widgets */}
                <aside className="w-80 border-r bg-muted/20 flex flex-col shrink-0 overflow-hidden">
                    {leftPanel}
                </aside>

                {/* Center: Canvas / Iframe */}
                <main className="flex-1 bg-muted/50 relative overflow-hidden flex flex-col">
                    {children}
                </main>

                {/* Right Panel: Inspector */}
                <aside className="w-80 border-l bg-background flex flex-col shrink-0 overflow-hidden">
                    {rightPanel}
                </aside>
            </div>
        </div>
    );
};
