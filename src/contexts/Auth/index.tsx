import React, { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { auth, firebase } from '../../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  setUser: any;
  signInWithgoogle: () => Promise<void>;
  signInWithgithub: () => Promise<void>;
  signInWithfacebook: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          toast.error('Missing information from Google Account');
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithgoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function signInWithgithub() {
    try {
      const provider = new firebase.auth.GithubAuthProvider();

      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Github Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function signInWithfacebook() {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();

      const result = await auth.signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Github Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (

    <AuthContext.Provider value={{ user, setUser, signInWithgoogle, signInWithgithub, signInWithfacebook }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;