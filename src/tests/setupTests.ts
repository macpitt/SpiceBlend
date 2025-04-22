
import { beforeAll, afterAll, afterEach, vi } from 'vitest'
import '@testing-library/jest-dom'
import { server } from '@/mocks/node'

// Set up MSW for testing environment
console.log('Setting up MSW for testing environment...')

beforeAll(() => {
  console.log('Starting MSW server for tests...')
  server.listen({
    onUnhandledRequest: 'bypass' // Less strict for tests
  })
})

afterEach(() => {
  console.log('Resetting MSW handlers...')
  server.resetHandlers()
})

afterAll(() => {
  console.log('Closing MSW server...')
  server.close()
})

// Mock console.error to reduce noise in test output
const originalError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes?.('Warning:') ||
    args[0]?.includes?.('Invalid prop') ||
    args[0]?.includes?.('React does not recognize')
  ) {
    return;
  }
  originalError(...args);
};

// Provide consistent mock data for all tests
vi.mock('@/hooks/useSpiceContext', () => ({
  useSpiceContext: () => ({
    blends: [
      { id: 1, name: 'Test Blend 1', description: 'Test description', spices: [], blends: [] },
      { id: 2, name: 'Test Blend 2', description: 'Test description', spices: [], blends: [] },
      { id: 3, name: 'Test Blend 3', description: 'Test description', spices: [], blends: [] },
    ],
    spices: [
      { id: 1, name: 'Test Spice 1', price: '$2.99', heat: 2 },
      { id: 2, name: 'Test Spice 2', price: '$3.99', heat: 1 },
      { id: 3, name: 'Test Spice 3', price: '$4.99', heat: 3 },
      { id: 4, name: 'Test Spice 4', price: '$5.99', heat: 0 },
    ],
    loadingBlends: false,
    loadingSpices: false,
    error: null,
    createBlend: vi.fn(),
  })
}));
