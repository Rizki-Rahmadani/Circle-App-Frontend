import { create } from 'zustand';

interface DialogState {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));

export default useDialogStore;
