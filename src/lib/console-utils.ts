// Console utilities for development
const isDevelopment = import.meta.env.DEV;

// Suppress specific warnings in development
export function suppressConsoleWarnings() {
  if (!isDevelopment) return;

  // Store original console methods
  const originalWarn = console.warn;
  const originalError = console.error;

  // Suppress specific warnings
  console.warn = (...args: unknown[]) => {
    const message = args[0];
    
    // Suppress React Router future flag warnings
    if (typeof message === 'string' && message.includes('React Router Future Flag Warning')) {
      return;
    }
    
    // Suppress -ms-high-contrast deprecation warnings
    if (typeof message === 'string' && message.includes('-ms-high-contrast')) {
      return;
    }
    
    // Suppress preload warnings
    if (typeof message === 'string' && message.includes('preloaded using link preload but not used')) {
      return;
    }
    
    // Suppress motion animation warnings
    if (typeof message === 'string' && message.includes('is not an animatable value')) {
      return;
    }
    
    // Call original warn for other messages
    originalWarn.apply(console, args);
  };

  // Suppress specific errors
  console.error = (...args: unknown[]) => {
    const message = args[0];
    
    // Suppress specific error types if needed
    if (typeof message === 'string' && message.includes('specific-error-to-suppress')) {
      return;
    }
    
    // Call original error for other messages
    originalError.apply(console, args);
  };
}

// Restore original console methods
export function restoreConsoleMethods() {
  if (!isDevelopment) return;
  
  // This would restore original methods if we stored them
  // For now, just a placeholder
}

// Initialize console utilities
if (isDevelopment) {
  suppressConsoleWarnings();
} 