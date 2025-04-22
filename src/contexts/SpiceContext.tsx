
import { createContext, useContext, ReactNode } from 'react';
import { useSpiceData } from '@/hooks/useSpiceData';
import type { SpiceBlend, Spice } from '@/types';
import { createSpiceBlend } from '@/services/spiceOperations';
import { toast } from "sonner";

interface SpiceContextType {
  spices: Spice[];
  blends: SpiceBlend[];
  loadingSpices: boolean;
  loadingBlends: boolean;
  error: string | null;
  createBlend: (blend: Omit<SpiceBlend, 'id'>) => Promise<SpiceBlend | null>;
  getBlendById: (id: number) => SpiceBlend | undefined;
  getSpiceById: (id: number) => Spice | undefined;
  refreshData: () => Promise<void>;
}

export const SpiceContext = createContext<SpiceContextType | undefined>(undefined);

export function SpiceProvider({ children }: { children: ReactNode }): JSX.Element {
  const spiceData = useSpiceData();
  
  const getBlendById = (id: number): SpiceBlend | undefined => {
    return spiceData.blends.find(blend => blend.id === id);
  };
  
  const getSpiceById = (id: number): Spice | undefined => {
    return spiceData.spices.find(spice => spice.id === id);
  };
  
  const createBlend = async (blend: Omit<SpiceBlend, 'id'>): Promise<SpiceBlend | null> => {
    try {
      const response = await createSpiceBlend(blend as Required<Omit<SpiceBlend, 'id'>>);
      if (response.error) {
        toast.error(response.error.message);
        return null;
      }
      if (response.data) {
        // Refresh data to include the new blend
        await spiceData.refreshData();
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Error creating blend:', error);
      toast.error('Failed to create blend');
      return null;
    }
  };
  
  const value = {
    ...spiceData,
    getBlendById,
    getSpiceById,
    createBlend
  };
  
  return (
    <SpiceContext.Provider value={value}>
      {children}
    </SpiceContext.Provider>
  );
}

// Custom hook to use the spice context
export function useSpiceContext() {
  const context = useContext(SpiceContext);
  if (context === undefined) {
    throw new Error('useSpiceContext must be used within a SpiceProvider');
  }
  return context;
}
