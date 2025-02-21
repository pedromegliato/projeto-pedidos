import { useToast as useToastLibrary } from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';

type ToastOptions = PluginOptions;

export const useToast = () => {
  const toast = useToastLibrary();
  
  const defaultOptions: ToastOptions = {
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    icon: true
  };

  return {
    success: (message: string, options?: Partial<ToastOptions>) => 
      toast.success(message, { ...defaultOptions, ...options }),
    
    error: (message: string, options?: Partial<ToastOptions>) => 
      toast.error(message, { ...defaultOptions, ...options }),
    
    info: (message: string, options?: Partial<ToastOptions>) => 
      toast.info(message, { ...defaultOptions, ...options }),
    
    warning: (message: string, options?: Partial<ToastOptions>) => 
      toast.warning(message, { ...defaultOptions, ...options })
  };
};