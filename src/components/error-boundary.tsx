'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="min-h-screen flex items-center justify-center p-6 text-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Bir şeyler yanlış gitti</h2>
                        <p className="text-gray-600 mb-6">Sayfayı yenilemeyi deneyebilir veya ana sayfaya dönebilirsiniz.</p>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="bg-black text-white px-6 py-2 rounded-full"
                        >
                            Ana Sayfaya Dön
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
