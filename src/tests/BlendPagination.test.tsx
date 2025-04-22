
import { render, screen, fireEvent } from './test-utils';
import { describe, it, expect, vi } from 'vitest';
import BlendPagination from '@/features/blends/components/BlendPagination';

describe('BlendPagination Component', () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    paginate: vi.fn(),
    totalItems: 45,
    itemsPerPage: 10,
    startItemIndex: 10,
    endItemIndex: 19
  };

  it('renders showing items text correctly', () => {
    render(<BlendPagination {...defaultProps} />);
    
    // Get the showing text element by data-testid and check its content
    const showingTextElement = screen.getByTestId('showing-text');
    expect(showingTextElement).toHaveTextContent(`Showing ${defaultProps.startItemIndex + 1} to ${defaultProps.endItemIndex + 1} of ${defaultProps.totalItems} blends`);
  });

  // Test for the case mentioned in the issue
  it('renders showing items text correctly for first page', () => {
    const props = {
      ...defaultProps,
      currentPage: 1,
      startItemIndex: 0,
      endItemIndex: 8,
      totalItems: 11
    };
    render(<BlendPagination {...props} />);
    
    // Get the showing text element by data-testid and check its content
    const showingTextElement = screen.getByTestId('showing-text');
    expect(showingTextElement).toHaveTextContent(`Showing ${props.startItemIndex + 1} to ${props.endItemIndex + 1} of ${props.totalItems} blends`);
  });

  it('renders correct page numbers', () => {
    render(<BlendPagination {...defaultProps} />);
    
    // First page should always be visible - use role and aria-label to find links
    expect(screen.getByRole('link', { name: /page 1/i })).toBeInTheDocument();
    
    // Current page and adjacent pages should be visible
    expect(screen.getByRole('link', { name: /page 2/i })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /page 3/i })).toBeInTheDocument();
    
    // Last page should always be visible
    expect(screen.getByRole('link', { name: /page 5/i })).toBeInTheDocument();
  });

  it('shows ellipsis when needed', () => {
    const props = {
      ...defaultProps,
      currentPage: 3,
      totalPages: 10
    };
    
    render(<BlendPagination {...props} />);
    
    // Find ellipsis elements by their aria-label
    const ellipses = screen.getAllByLabelText('More pages');
    expect(ellipses.length).toBe(1);
  });

  it('calls paginate function when page is clicked', () => {
    render(<BlendPagination {...defaultProps} />);
    
    // Click on page 3 using role
    fireEvent.click(screen.getByRole('link', { name: /page 3/i }));
    
    expect(defaultProps.paginate).toHaveBeenCalledWith(3);
  });

  it('calls paginate function with previous page when Previous is clicked', () => {
    render(<BlendPagination {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('link', { name: /go to previous page/i }));
    
    expect(defaultProps.paginate).toHaveBeenCalledWith(1);
  });

  it('calls paginate function with next page when Next is clicked', () => {
    render(<BlendPagination {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('link', { name: /go to next page/i }));
    
    expect(defaultProps.paginate).toHaveBeenCalledWith(3);
  });

  it('disables Previous button on first page', () => {
    const props = {
      ...defaultProps,
      currentPage: 1
    };
    
    render(<BlendPagination {...props} />);
    
    // Need to select by aria-label since the element structure has changed
    const previousButton = screen.getByRole('link', { name: /go to previous page/i });
    expect(previousButton).toHaveClass('pointer-events-none');
    expect(previousButton).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables Next button on last page', () => {
    const props = {
      ...defaultProps,
      currentPage: 5
    };
    
    render(<BlendPagination {...props} />);
    
    // Need to select by aria-label since the element structure has changed
    const nextButton = screen.getByRole('link', { name: /go to next page/i });
    expect(nextButton).toHaveClass('pointer-events-none');
    expect(nextButton).toHaveAttribute('aria-disabled', 'true');
  });
});
