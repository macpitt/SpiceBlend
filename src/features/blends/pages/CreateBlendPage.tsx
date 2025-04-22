import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpiceContext } from '@/hooks/useSpiceContext';
import Layout from '@/components/Layout';
import { toast } from "sonner";
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpiceSelectionSection from '@/features/blends/components/SpiceSelectionSection';
import BlendSelectionSection from '@/features/blends/components/BlendSelectionSection';
import { BlendCreationForm } from '@/features/blends/components/BlendCreationForm';
import type { BlendFormValues } from '@/lib/validations/blend';

const CreateBlendPage = () => {
  const navigate = useNavigate();
  const { spices, blends, createBlend } = useSpiceContext();

  const [selectedSpices, setSelectedSpices] = useState<number[]>([]);
  const [selectedBlends, setSelectedBlends] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState<BlendFormValues>({
    name: '',
    description: '',
    spices: [],
    blends: []
  });

  // Track if the form is valid
  const [isFormValid, setIsFormValid] = useState(false);

  const hasSelectedItems = selectedSpices.length > 0 || selectedBlends.length > 0;
  
  // Update form values when selections change
  useEffect(() => {
    setFormValues(prev => ({
      ...prev,
      spices: selectedSpices,
      blends: selectedBlends
    }));
  }, [selectedSpices, selectedBlends]);

  const handleAddSpice = (spiceId: number): void => {
    if (!selectedSpices.includes(spiceId)) {
      setSelectedSpices(prev => [...prev, spiceId]);
      toast.success("Spice added to blend");
    }
  };
  
  const handleAddBlend = (blendId: number): void => {
    if (!selectedBlends.includes(blendId)) {
      setSelectedBlends(prev => [...prev, blendId]);
      toast.success("Blend added to mix");
    }
  };
  
  const removeSpice = (spiceId: number): void => {
    setSelectedSpices(prev => prev.filter(id => id !== spiceId));
    toast.info("Spice removed from blend");
  };
  
  const removeBlend = (blendId: number): void => {
    setSelectedBlends(prev => prev.filter(id => id !== blendId));
    toast.info("Blend removed from mix");
  };
  
  const handleFormChange = (values: BlendFormValues) => {
    setFormValues(values);
  };

  const handleFormValidity = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  const handleSubmit = async (values: BlendFormValues): Promise<void> => {
    setIsSubmitting(true);
    
    try {
      const blendData = {
        name: values.name,
        description: values.description,
        spices: selectedSpices,
        blends: selectedBlends
      };
      
      const result = await createBlend(blendData);
      
      if (result) {
        toast.success(`${blendData.name} blend created!`);
        navigate(`/blends/${result.id}`);
      }
    } catch (error) {
      toast.error("Failed to create blend", {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Determine if button should be enabled
  const isButtonDisabled = isSubmitting || !isFormValid || !hasSelectedItems;

  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-spice-cinnamon mb-6">Create New Blend</h1>
        
        <BlendCreationForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          hasSelected={hasSelectedItems}
          initialValues={{
            ...formValues,
            spices: selectedSpices,
            blends: selectedBlends
          }}
          onChange={handleFormChange}
          onValidityChange={handleFormValidity}
        />

        <SpiceSelectionSection 
          spices={spices}
          selectedSpices={selectedSpices}
          onAddSpice={handleAddSpice}
          onRemoveSpice={removeSpice}
        />
            
        <BlendSelectionSection 
          blends={blends}
          selectedBlends={selectedBlends}
          onAddBlend={handleAddBlend}
          onRemoveBlend={removeBlend}
        />

        <div className="sticky bottom-4 z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200 mt-8">
          <Button
            type="button"
            disabled={isButtonDisabled}
            className="w-full bg-spice-cinnamon hover:bg-spice-cardamom text-white"
            onClick={() => handleSubmit(formValues)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Blend'
            )}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateBlendPage;