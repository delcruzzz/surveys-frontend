export interface NeighborhoodState {
  isLoading: boolean;
  neighborhoods: NeighborhoodResponse[];
  neighborhood: NeighborhoodResponse;
}

export interface NeighborhoodResponse {
  id: number;
  name: string;
}
