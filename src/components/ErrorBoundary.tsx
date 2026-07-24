import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md font-sans">
          <div className="bg-[#1A1A1A] border-2 border-[#FF3E00] rounded-3xl p-6 max-w-md w-full text-center space-y-4 text-white shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 text-[#FF3E00] rounded-2xl border border-red-500/40 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">
              {this.props.fallbackTitle || 'Si è verificato un errore'}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Si è verificato un problema temporaneo durante il caricamento di questo modulo.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="w-full py-3 bg-[#FF3E00] hover:bg-white hover:text-black font-black text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-2 border border-white"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ricarica Pagina</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
