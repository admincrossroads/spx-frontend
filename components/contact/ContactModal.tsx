'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Send, CheckCircle2, XCircle } from 'lucide-react';
import { useContactModal } from '@/lib/contexts/ContactModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

export function ContactModal() {
  const { isOpen, origin, closeModal } = useContactModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_st64mz5';
  const EMAILJS_TEMPLATE_ID = 'template_enbs2po';
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      if (!EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS Public Key is not configured. Please add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY to your environment variables.');
      }

      // Initialize EmailJS (only needed once, but safe to call multiple times)
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      if (result.text === 'OK') {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', email: '', message: '' });
        // Close modal after 2 seconds
        setTimeout(() => {
          closeModal();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error: any) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error?.text || error?.message || 'Failed to send message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form and status when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md lg:max-w-2xl [&>button]:text-white [&>button]:hover:bg-gray-800 [&>button]:hover:text-white [&>button]:focus:ring-gray-600 overflow-hidden shadow-2xl p-0 border-none data-[state=open]:animate-none data-[state=closed]:animate-none">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="contact-modal-content"
              initial={origin ? { 
                opacity: 0, 
                scale: 0,
                x: origin.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0),
                y: origin.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0),
                transformOrigin: 'center center'
              } : { 
                opacity: 0, 
                scale: 0.9, 
                y: 20 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0, 
                y: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5,
                transition: { duration: 0.2 }
              }}
              transition={{ 
                type: "spring",
                damping: 28,
                stiffness: 220,
                mass: 0.8
              }}
              className="w-full p-6"
            >
              <DialogHeader>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <DialogTitle className="text-2xl font-bold text-white mb-2">
                Contact Us
              </DialogTitle>
            </motion.div>
          </DialogHeader>
          
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Alert className="bg-green-900/50 border-green-700 text-green-100 mb-4">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle className="text-green-100">Message Sent!</AlertTitle>
                <AlertDescription className="text-green-200">
                  Thank you for contacting us. We'll get back to you soon.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <Alert variant="destructive" className="bg-red-900/50 border-red-700 text-red-100 mb-4">
                <XCircle className="h-4 w-4" />
                <AlertTitle className="text-red-100">Error</AlertTitle>
                <AlertDescription className="text-red-200">
                  {errorMessage || 'Failed to send message. Please try again later.'}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                placeholder="Your name"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="message" className="text-white">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus-visible:ring-blue-500 focus-visible:border-blue-500 resize-none"
                placeholder="Your message..."
              />
            </motion.div>

            <motion.div 
              className="flex justify-end gap-3 pt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 border border-gray-600 bg-transparent text-white hover:bg-gray-800 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-600"
                style={{ color: '#ffffff', backgroundColor: 'transparent' }}
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

