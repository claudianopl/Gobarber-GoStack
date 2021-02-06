import React from 'react';

import SingIn from './pages/SignIn/index';
// import SingUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
