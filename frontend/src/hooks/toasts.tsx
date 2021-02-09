import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer/index';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContexData {
  addToast(messages: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContexData>({} as ToastContexData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessage] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };
      setMessage((state) => [...state, toast]);
    },
    [],
  );
  const removeToast = useCallback((id: string) => {
    setMessage((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContexData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('UseToast must be used within a ToastProvider');
  }

  return context;
}
