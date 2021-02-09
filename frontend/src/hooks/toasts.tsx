import React, { createContext, useContext, useCallback } from 'react';

import ToastContainer from '../components/ToastContainer/index';

interface ToastContexData {
  addToast(): void;
  removeToast(): void;
}

const ToastContext = createContext<ToastContexData>({} as ToastContexData);

export const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('addToast');
  }, []);
  const removeToast = useCallback(() => {
    console.log('removeToast');
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
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
