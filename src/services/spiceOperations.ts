
import { api } from '@/services/api';
import type { SpiceBlend, AsyncResult, Spice } from '@/types';

export async function createSpiceBlend(
  blend: Required<Omit<SpiceBlend, 'id'>>
): AsyncResult<SpiceBlend> {
  try {
    const newBlend = await api.createBlend(blend);
    return { data: newBlend };
  } catch (error) {
    console.error('Blend creation failed:', error);
    return { 
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: 'BLEND_CREATION_FAILED'
      }
    };
  }
}

export async function getAllSpicesInBlend(
  blendId: number
): AsyncResult<Spice[]> {
  try {
    const spices = await api.getAllSpicesInBlend(blendId);
    return { data: spices };
  } catch (error) {
    console.error(`Failed to fetch spices for blend ${blendId}:`, error);
    return { 
      error: {
        message: 'Could not fetch spices',
        code: 'SPICES_FETCH_FAILED'
      }
    };
  }
}
