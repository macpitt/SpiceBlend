
import { useSpiceContext as useContext } from '@/contexts/SpiceContext';

/**
 * Custom hook that provides access to the SpiceContext
 * Preserves backward compatibility with components using the original unified context API
 * 
 * @returns Combined context values from all spice-related contexts
 */
export function useSpiceContext() {
  const context = useContext();
  
  if (!context) {
    throw new Error('useSpiceContext must be used within a SpiceProvider');
  }
  
  return context;
}
