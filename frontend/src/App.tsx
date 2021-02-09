import React from 'react';

import SingIn from './pages/SignIn/index';
// import SingUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

import AppProvider from './hooks/index';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SingIn />
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
