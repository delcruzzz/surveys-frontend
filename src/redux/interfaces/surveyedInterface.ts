export interface SurveyedState {
  isLoading: boolean
  surveyed: SurveyedResponse[]
  respondent: SurveyedResponse,
  openModalUpdateRespondent: boolean,
  openModalCreateRespondent: boolean,
}

export interface SurveyedResponse {
  id: number
  name: string
  phoneNumber: string
  identityCard: string
  address: string
  neighborhood: NeighborhoodSurveyed
  user: SurveyedUser
  votingTableId: VotingTableSurveyed
}

export interface NeighborhoodSurveyed {
  id: number
  name: string
  municipality: MunicipalitySurveyed
}

export interface MunicipalitySurveyed {
  id: number
  name: string
}

export interface SurveyedUser {
  id: number
  name: string
  identityCard: string
}

export interface VotingTableSurveyed {
  id: number
  name: string
  pollingStation: PollingStationSurveyed
}

export interface PollingStationSurveyed {
  id: number
  name: string
  votingMunicipality: VotingMunicipalitySurveyed
}

export interface VotingMunicipalitySurveyed {
  id: number
  name: string
}

export interface CreateSurveyed {
  name: string
  phoneNumber: string
  identityCard: string
  address: string
  neighborhoodId: number
  userId: number
  votingTable: number
}

export interface UpdateSurveyed {
  name?: string
  phoneNumber?: string
  identityCard?: string
  address?: string
  neighborhoodId?: number
  userId?: number
  votingTable?: number
}
