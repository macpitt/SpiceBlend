
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configure the MSW worker with the handlers
export const worker = setupWorker(...handlers);

// Start the worker only in development mode and in the browser environment
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log('Starting MSW in development mode');
  worker.start({
    onUnhandledRequest: 'bypass'
  }).catch(error => {
    console.error('MSW worker failed to start:', error);
  });
}
