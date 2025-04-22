
import { render, screen } from './test-utils';
import { describe, it, expect, vi } from 'vitest';
import BlendCard from '@/features/blends/components/BlendCard';
import type { SpiceBlend, Spice } from '@/types';

// Mock the useSpiceContext hook
vi.mock('@/hooks/useSpiceContext', () => ({
  useSpiceContext: () => ({
    getSpiceById: (id: number) => {
      const mockSpices: Record<number, Spice> = {
        1: { id: 1, name: 'Cinnamon', price: '$3.99', heat: 1, color: 'A52A2A' },
        2: { id: 2, name: 'Paprika', price: '$2.99', heat: 2, color: 'FF4500' }
      };
      return mockSpices[id];
    },
    getBlendById: (id: number) => {
      const mockBlends: Record<number, SpiceBlend> = {
        3: { id: 3, name: 'Hot Mix', description: 'A hot blend', spices: [2], blends: [] },
        4: { id: 4, name: 'Sweet Mix', description: 'A sweet blend', spices: [1], blends: [] }
      };
      return mockBlends[id];
    }
  })
}));

describe('BlendCard Component', () => {
  const mockBlend: SpiceBlend = {
    id: 1,
    name: 'Test Blend',
    description: 'A test blend description',
    spices: [1, 2],
    blends: [3, 4]
  };
  
  it('renders blend name and description', () => {
    render(<BlendCard blend={mockBlend} />);
    
    expect(screen.getByText('Test Blend')).toBeInTheDocument();
    expect(screen.getByText('A test blend description')).toBeInTheDocument();
  });
  
  it('renders spice badges', () => {
    render(<BlendCard blend={mockBlend} />);
    
    expect(screen.getByText('Cinnamon')).toBeInTheDocument();
    expect(screen.getByText('Paprika')).toBeInTheDocument();
  });
  
  it('renders included blend names', () => {
    render(<BlendCard blend={mockBlend} />);
    
    expect(screen.getByText('Hot Mix')).toBeInTheDocument();
    expect(screen.getByText('Sweet Mix')).toBeInTheDocument();
  });
  
  it('renders view details link when not expanded', () => {
    render(<BlendCard blend={mockBlend} />);
    
    const link = screen.getByText('View Details');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/blends/1');
  });
  
  it('does not render view details link when expanded', () => {
    render(<BlendCard blend={mockBlend} expanded={true} />);
    
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });
});
