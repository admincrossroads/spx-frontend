'use client';

import { ContactModalProvider as Provider } from '@/lib/contexts/ContactModalContext';
import { ContactModal } from './ContactModal';

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
      <ContactModal />
    </Provider>
  );
}

