'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  origin: { x: number; y: number } | null;
  openModal: (e?: React.MouseEvent | { x: number; y: number }) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const openModal = (e?: React.MouseEvent | { x: number; y: number }) => {
    if (e) {
      if ('clientX' in e) {
        setOrigin({ x: e.clientX, y: e.clientY });
      } else {
        setOrigin(e);
      }
    } else {
      setOrigin(null);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Delay clearing origin to allow exit animation to use it if needed
    setTimeout(() => setOrigin(null), 300);
  };

  return (
    <ContactModalContext.Provider value={{ isOpen, origin, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}

