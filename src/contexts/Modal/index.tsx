import React, { ReactNode, useState } from 'react';
import { createContext } from 'react';

type ModalContextType = {
  modal: boolean;
  setModal: any;
  title?: string;
  description?: string;
};

type ModalContextProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext({} as ModalContextType);

function ModalContextProvider(props: ModalContextProviderProps) {
  const [modal, setModal] = useState(true);

  return (

    <ModalContext.Provider value={{ modal, setModal }}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;