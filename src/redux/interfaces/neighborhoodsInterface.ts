export interface NeighborhoodState {
  isLoading: boolean;
  neighborhoods: NeighborhoodResponse[];
  neighborhood: NeighborhoodResponse | null;
}

export interface NeighborhoodResponse {
  id: number;
  name: string;
}
