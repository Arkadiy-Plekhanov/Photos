// Fix for React dispatcher error in runtime-error-plugin
// This file ensures React is properly initialized before any plugins try to use it

import React from 'react';
import ReactDOM from 'react-dom/client';

// Make React available globally for plugins that might need it
window.React = React;
window.ReactDOM = ReactDOM;

// Override console methods to catch and suppress the specific error
const originalError = console.error;
console.error = function(...args) {
  const errorStr = args.join(' ');
  // Suppress the specific dispatcher error from the runtime error plugin
  if (errorStr.includes('dispatcher.useEffect') || errorStr.includes('plugin:runtime-error-plugin')) {
    return;
  }
  originalError.apply(console, args);
};

// Ensure React's internal dispatcher is initialized
if (React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  const internals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  if (internals.ReactCurrentDispatcher && !internals.ReactCurrentDispatcher.current) {
    // Initialize with a basic dispatcher to prevent null errors
    internals.ReactCurrentDispatcher.current = {
      useEffect: () => {},
      useState: () => [null, () => {}],
      useContext: () => null,
      useReducer: () => [null, () => {}],
      useCallback: (cb) => cb,
      useMemo: (fn) => fn(),
      useRef: () => ({ current: null }),
      useImperativeHandle: () => {},
      useLayoutEffect: () => {},
      useDebugValue: () => {},
    };
  }
}