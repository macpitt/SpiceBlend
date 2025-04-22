
import { render, screen } from './test-utils';
import { describe, it, expect, vi } from 'vitest';
import HomePage from '@/pages/HomePage';

// Mock the Layout component to simplify testing
vi.mock('@/components/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="layout">{children}</div>
}));

// Mock components to simplify testing
vi.mock('@/features/blends/components/BlendCard', () => ({
  default: ({ blend }: any) => <div data-testid="blend-card">{blend.name}</div>
}));

vi.mock('@/features/spices/components/SpiceCard', () => ({
  default: ({ spice }: any) => <div data-testid="spice-card">{spice.name}</div>
}));

vi.mock('@/components/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>
}));

// Mock the context
vi.mock('@/hooks/useSpiceContext', () => ({
  useSpiceContext: () => ({
    blends: [
      { id: 1, name: 'Blend 1', description: 'Test', spices: [], blends: [] },
      { id: 2, name: 'Blend 2', description: 'Test', spices: [], blends: [] },
      { id: 3, name: 'Blend 3', description: 'Test', spices: [], blends: [] }
    ],
    spices: [
      { id: 1, name: 'Spice 1', price: '$1.00', heat: 1, color: '000000' },
      { id: 2, name: 'Spice 2', price: '$2.00', heat: 2, color: '000000' },
      { id: 3, name: 'Spice 3', price: '$3.00', heat: 3, color: '000000' },
      { id: 4, name: 'Spice 4', price: '$4.00', heat: 4, color: '000000' }
    ],
    loadingBlends: false,
    loadingSpices: false,
    error: null
  })
}));

describe('HomePage Component', () => {
  it('renders the welcome heading', () => {
    render(<HomePage />);
    expect(screen.getByText(/Welcome to SpiceBlend/i)).toBeInTheDocument();
  });

  it('displays featured blends section', () => {
    render(<HomePage />);
    expect(screen.getByText(/Featured Blends/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('blend-card')).toHaveLength(3);
  });

  it('displays popular spices section', () => {
    render(<HomePage />);
    expect(screen.getByText(/Popular Spices/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('spice-card')).toHaveLength(4);
  });

  it('contains a call-to-action button', () => {
    render(<HomePage />);
    const ctaButton = screen.getByText(/Start Blending/i);
    expect(ctaButton).toBeInTheDocument();
  });

  it('contains view all links', () => {
    render(<HomePage />);
    const viewAllLinks = screen.getAllByText(/View All/i);
    expect(viewAllLinks).toHaveLength(2);
  });
});