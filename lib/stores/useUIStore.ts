import { create } from 'zustand';

interface UIState {
  contactModalOpen: boolean;
  contactModalOrigin: { x: number; y: number } | null;
  openContactModal: (origin?: React.MouseEvent | { x: number; y: number }) => void;
  closeContactModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  contactModalOpen: false,
  contactModalOrigin: null,
  openContactModal: (origin) => {
    if (origin) {
      if ('clientX' in origin) {
        // It's a MouseEvent
        set({
          contactModalOpen: true,
          contactModalOrigin: { x: origin.clientX, y: origin.clientY },
        });
      } else {
        // It's a coordinate object
        set({
          contactModalOpen: true,
          contactModalOrigin: origin,
        });
      }
    } else {
      set({
        contactModalOpen: true,
        contactModalOrigin: null,
      });
    }
  },
  closeContactModal: () => {
    set({ contactModalOpen: false });
    // Delay clearing origin to allow exit animation to use it if needed
    setTimeout(() => set({ contactModalOrigin: null }), 300);
  },
}));

