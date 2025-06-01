import { create } from 'zustand';

interface TournamentStoreState {
  pageSize: number;
  pageNumber: number;
  setPageNumber: (number: number) => void;
}

export const useTournamentStore = create<TournamentStoreState>((set) => ({
  pageNumber: 0,
  pageSize: 10,
  setPageNumber: (number: number) => set({ pageNumber: number }),
}));

// TODO: remove or stay?
