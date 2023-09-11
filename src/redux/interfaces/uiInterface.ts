export interface MsgSnackBar {
  id?: string,
  message: string,
  variant: string,
}
export interface UiState {
  loading: boolean,
  msgSnackBar: MsgSnackBar
}
