import React from 'react';

import { AuthContext } from '../AuthContext';

const useAuth = () => {
  const { isInitialized, isSignedIn, isIntro, signIn, signOut } = React.useContext(AuthContext);
  return { isInitialized, isSignedIn, isIntro, signIn, signOut };
};

export default useAuth;
