export interface MunicipalityState {
  isLoading: boolean
  municipalities: MunicipalityResponse[]
  municipality: MunicipalityResponse | null
}

export interface MunicipalityResponse {
  id: number
  name: string
  neighborhoods: NeighborhoodsMunicipality[]
}

export interface NeighborhoodsMunicipality {
  id: number
  name: string
}
