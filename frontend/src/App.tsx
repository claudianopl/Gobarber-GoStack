import React from 'react';

import SingIn from './pages/SignIn/index';
// import SingUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';
import ToastContainer from './components/ToastContainer/index';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyle />
  </>
);

export default App;
