
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface BlendPaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startItemIndex: number;
  endItemIndex: number;
}

const BlendPagination = ({ 
  currentPage, 
  totalPages, 
  paginate,
  totalItems,
  startItemIndex,
  endItemIndex
}: BlendPaginationProps) => {
  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => paginate(1)} 
          isActive={currentPage === 1}
          aria-label={`Page 1`}
          role="link"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis aria-label="More pages" />
        </PaginationItem>
      );
    }
    
    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => paginate(i)} 
            isActive={currentPage === i}
            aria-label={`Page ${i}`}
            role="link"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if needed
    if (currentPage < totalPages - 2 && totalPages > 3) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis aria-label="More pages" />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => paginate(totalPages)} 
            isActive={currentPage === totalPages}
            aria-label={`Page ${totalPages}`}
            role="link"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  // Create the showing text for better testability
  const showingText = `Showing ${startItemIndex + 1} to ${endItemIndex + 1} of ${totalItems} blends`;

  return (
    <div className="mt-8">
      <p className="text-sm text-gray-500 mb-4 text-center" data-testid="showing-text">
        {showingText}
      </p>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              aria-disabled={currentPage === 1 ? true : undefined}
              role="link"
            />
          </PaginationItem>
          
          {renderPaginationItems()}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              aria-disabled={currentPage === totalPages ? true : undefined}
              role="link"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default BlendPagination;
