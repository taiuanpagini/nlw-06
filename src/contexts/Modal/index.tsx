import React, { ReactNode, useState } from 'react';
import { createContext } from 'react';

type Modal = {
  active: boolean;
  title?: string | null;
  description?: string | null;
  questionId?: string;
  roomId?: string;
};

type ModalContextType = {
  modal: Modal;
  setModal: any;
};

type ModalContextProviderProps = {
  children: ReactNode;
};

export const ModalContext = createContext({} as ModalContextType);

function ModalContextProvider(props: ModalContextProviderProps) {
  const [modal, setModal] = useState<Modal>({ active: false });

  return (
    <ModalContext.Provider value={{ modal, setModal }}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContextProvider;