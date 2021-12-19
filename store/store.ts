import create from "zustand";

type Store = {
  search: string;
  setSearch: (search: string) => void;

  storageTrigger: boolean;
  setStorageTrigger: () => void;

  isError: boolean;
  setError: (err: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  // search
  search: "",
  setSearch: (search) => set((state) => ({ search })),

  // storage
  storageTrigger: false,
  setStorageTrigger: () =>
    set((state) => ({ storageTrigger: !state.storageTrigger })),

  // 403 error

  isError: false,
  setError: (err) => set((state) => ({ isError: err })),
}));
