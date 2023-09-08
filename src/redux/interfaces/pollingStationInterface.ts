export interface pollingStationState {
  isLoading: boolean;
  pollingStations: pollingStationResponse[];
  pollingStation: pollingStationResponse;
}

export interface pollingStationResponse {
  id: number;
  name: string;
  votingTables: VotingTablesPollingStation[]
}

export interface VotingTablesPollingStation {
  id: number;
  name: string;
}
