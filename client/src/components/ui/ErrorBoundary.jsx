import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-2xl font-semibold text-ink-100 mb-3">Something went wrong</h1>
            <p className="text-ink-400 mb-6">Please refresh the page and try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-gradient text-white font-semibold px-6 py-3 rounded-full"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
