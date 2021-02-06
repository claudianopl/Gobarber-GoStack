import React from 'react';

import SingIn from './pages/SignIn/index';
// import SingUp from './pages/SignUp/index';
import GlobalStyle from './styles/global';

import AuthContext from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'Claudiano' }}>
      <SingIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);

export default App;
