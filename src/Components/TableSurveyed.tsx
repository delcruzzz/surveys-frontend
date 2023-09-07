import { useEffect } from 'react';
import { useCustomDispatch, useCustomSelector } from '../redux/hooks/useRedux';
import { fetchSurveyed } from '../redux/thunks/surveyedThunk';
import { TableBodySurveyed } from './tableSurveyed/TableBodySurveyed';

export const TableSurveyed = () => {
  const { surveyed } = useCustomSelector((state) => state.surveyed);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(fetchSurveyed())
  }, [dispatch])

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>lider</th>
          <th>nombre</th>
          <th>telefono</th>
          <th>cédula</th>
          <th>municipio</th>
          <th>barrio</th>
          <th>dirección</th>
          <th>municipio de votación</th>
          <th>puesto de votación</th>
          <th>mesa de votación</th>
          <th>acciones</th>
        </tr>
      </thead>
      <tbody>
        {surveyed && surveyed.map((surveyed, i) => {
          return (
            <TableBodySurveyed surveyed={surveyed} key={i} />
          )
        })}
      </tbody>
    </table>
  )
}
