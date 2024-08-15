import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Layout = () => {
  // Initialize the user state with the current authenticated user.
  const [user, setUser] = useState(auth.currentUser);

  // Listen for changes in the authentication state.
  onAuthStateChanged(auth, () => {
      // Update the user state with the current authenticated user whenever the auth state changes.
      setUser(auth.currentUser);
  });

  return (
    <div>
      <Navbar user={ user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;