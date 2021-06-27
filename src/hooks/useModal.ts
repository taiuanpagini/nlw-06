import { useContext } from 'react'
import { ModalContext } from '../contexts/Modal';

export function useModal() {
  const value =  useContext(ModalContext);

  return value;
}