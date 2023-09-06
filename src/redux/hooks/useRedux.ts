import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

type DispatchFunc = () => AppDispatch

export const useCustomDispatch:  DispatchFunc = useDispatch;
export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector;
