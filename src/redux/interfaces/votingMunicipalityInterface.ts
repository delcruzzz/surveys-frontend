export interface VotingMunicipalityState {
  isLoading: boolean
  votingMunicipalities: VotingMunicipalityResponse[]
  votingMunicipality: VotingMunicipalityResponse
}

export interface VotingMunicipalityResponse {
  id: number
  name: string
  pollingStations: VotingMunicipalityMunicipality[]
}

export interface VotingMunicipalityMunicipality {
  id: number
  name: string
}
