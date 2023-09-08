export interface VotingTableState {
  isLoading: boolean
  votingTables: VotingTableResponse[]
  votingTably: VotingTableResponse
}

export interface VotingTableResponse {
  id: number
  name: string
  votingTables: VotingTableMunicipality[]
}

export interface VotingTableMunicipality {
  id: number
  name: string
}
