
import { render, screen } from './test-utils';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6');
    expect(spinner).toHaveClass('h-6');
  });

  it('renders with small size', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-4');
    expect(spinner).toHaveClass('h-4');
  });

  it('renders with large size', () => {
    render(<LoadingSpinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-10');
    expect(spinner).toHaveClass('h-10');
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="test-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('test-class');
  });

  it('has correct accessible name', () => {
    render(<LoadingSpinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
