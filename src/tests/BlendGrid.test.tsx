import { render, screen } from './test-utils';
import { describe, it, expect, vi } from 'vitest';
import BlendGrid from '@/features/blends/components/BlendGrid';
import type { SpiceBlend } from '@/types';

// Mock the BlendCard component to simplify testing
vi.mock('@/features/blends/components/BlendCard', () => ({
  default: ({ blend }: { blend: SpiceBlend }) => <div data-testid={`blend-card-${blend.id}`}>{blend.name}</div>
}));

// Mock ScrollArea component since we're testing if BlendGrid is using it properly
vi.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ className, children }: { className: string, children: React.ReactNode }) => 
    <div className={className} data-testid="scroll-area">{children}</div>
}));

describe('BlendGrid Component', () => {
  it('renders no blends found message when array is empty', () => {
    render(<BlendGrid blends={[]} />);
    expect(screen.getByText('No blends found matching your search.')).toBeInTheDocument();
  });

  it('renders blend cards for each blend', () => {
    const mockBlends: SpiceBlend[] = [
      { id: 1, name: 'Blend 1', description: 'Description 1', spices: [], blends: [] },
      { id: 2, name: 'Blend 2', description: 'Description 2', spices: [1], blends: [] },
      { id: 3, name: 'Blend 3', description: 'Description 3', spices: [], blends: [1] }
    ];
    
    render(<BlendGrid blends={mockBlends} />);
    
    expect(screen.getByTestId('blend-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('blend-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('blend-card-3')).toBeInTheDocument();
    expect(screen.getByText('Blend 1')).toBeInTheDocument();
    expect(screen.getByText('Blend 2')).toBeInTheDocument();
    expect(screen.getByText('Blend 3')).toBeInTheDocument();
  });
  
  it('renders within a ScrollArea component', () => {
    const mockBlends: SpiceBlend[] = [
      { id: 1, name: 'Blend 1', description: 'Description 1', spices: [], blends: [] }
    ];
    
    render(<BlendGrid blends={mockBlends} />);
    
    // Check for ScrollArea with expected class
    const scrollArea = screen.getByTestId('scroll-area');
    expect(scrollArea).toHaveClass('h-[calc(100vh-350px)]');
  });
});