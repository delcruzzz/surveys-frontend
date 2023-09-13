export interface VotingMunicipalityState {
  isLoading: boolean
  votingMunicipalities: VotingMunicipalityResponse[]
  votingMunicipality: VotingMunicipalityResponse
}

export interface VotingMunicipalityResponse {
  id: number
  name: string
  pollingStations: VotingMunicipalityMunicipality[]
  votingTable: VotingTableMunicipality[]
}

export interface VotingMunicipalityMunicipality {
  id: number
  name: string
}

export interface VotingTableMunicipality {
  id: number
  name: string
}
