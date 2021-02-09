import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toasts';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
