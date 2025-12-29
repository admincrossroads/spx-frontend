import { create } from 'zustand';

interface FilterState {
  // Insights filters
  insightsType: string | null;
  insightsTag: string | null;
  insightsSearch: string;
  
  // Projects filters
  projectsFocusArea: string;
  projectsStatus: string;
  projectsRegion: string;
  projectsSearch: string;
  
  // Innovation hub filters
  innovationCategory: string;
  innovationStatus: string;
  innovationFocusArea: string;
  innovationSearch: string;
  
  // Actions
  setInsightsFilters: (filters: {
    type?: string | null;
    tag?: string | null;
    search?: string;
  }) => void;
  setProjectsFilters: (filters: {
    focusArea?: string;
    status?: string;
    region?: string;
    search?: string;
  }) => void;
  setInnovationFilters: (filters: {
    category?: string;
    status?: string;
    focusArea?: string;
    search?: string;
  }) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  // Initial state
  insightsType: null,
  insightsTag: null,
  insightsSearch: '',
  projectsFocusArea: 'All',
  projectsStatus: 'All',
  projectsRegion: 'All',
  projectsSearch: '',
  innovationCategory: 'all',
  innovationStatus: 'All',
  innovationFocusArea: 'All',
  innovationSearch: '',
  
  // Actions
  setInsightsFilters: (filters) =>
    set((state) => ({
      insightsType: filters.type !== undefined ? filters.type : state.insightsType,
      insightsTag: filters.tag !== undefined ? filters.tag : state.insightsTag,
      insightsSearch: filters.search !== undefined ? filters.search : state.insightsSearch,
    })),
  
  setProjectsFilters: (filters) =>
    set((state) => ({
      projectsFocusArea: filters.focusArea !== undefined ? filters.focusArea : state.projectsFocusArea,
      projectsStatus: filters.status !== undefined ? filters.status : state.projectsStatus,
      projectsRegion: filters.region !== undefined ? filters.region : state.projectsRegion,
      projectsSearch: filters.search !== undefined ? filters.search : state.projectsSearch,
    })),
  
  setInnovationFilters: (filters) =>
    set((state) => ({
      innovationCategory: filters.category !== undefined ? filters.category : state.innovationCategory,
      innovationStatus: filters.status !== undefined ? filters.status : state.innovationStatus,
      innovationFocusArea: filters.focusArea !== undefined ? filters.focusArea : state.innovationFocusArea,
      innovationSearch: filters.search !== undefined ? filters.search : state.innovationSearch,
    })),
  
  resetFilters: () =>
    set({
      insightsType: null,
      insightsTag: null,
      insightsSearch: '',
      projectsFocusArea: 'All',
      projectsStatus: 'All',
      projectsRegion: 'All',
      projectsSearch: '',
      innovationCategory: 'all',
      innovationStatus: 'All',
      innovationFocusArea: 'All',
      innovationSearch: '',
    }),
}));

