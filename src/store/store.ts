import create from "zustand";

type IStore = {
  category: string;
  setCategory: (keyword: string) => void;
};

export const useStore = create<IStore>((set) => ({
  category: "All",
  setCategory: (keyword) => set((state) => ({ category: keyword })),
}));
