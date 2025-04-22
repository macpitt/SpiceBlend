
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configure the MSW server with the handlers
export const server = setupServer(...handlers);

// Simple configuration for node environment
console.log('MSW server configuration loaded for node environment');
