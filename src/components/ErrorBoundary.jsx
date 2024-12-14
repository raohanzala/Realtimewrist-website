import React, { Component } from 'react';

// Define the ErrorBoundary component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Lifecycle method to catch errors in the component tree
  static getDerivedStateFromError() {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  // Lifecycle method to log error information
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if there was an error
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong.</h1>
            <p className="text-gray-700">Sorry, there was a problem loading the page. Please try again later.</p>
          </div>
        </div>
      );
    }

    // Render children if there is no error
    return this.props.children;
  }
}

export default ErrorBoundary;
