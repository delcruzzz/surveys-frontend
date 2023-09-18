import { useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "../redux/hooks/useRedux";
import { fetchSurveyed } from "../redux/thunks/surveyedThunk";
import { TableBodySurveyed } from "./tableSurveyed/TableBodySurveyed";

export const TableSurveyed = () => {
  const { surveyed } = useCustomSelector((state) => state.surveyed);
  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(fetchSurveyed());
  }, [dispatch]);

  return (
    <table className="table res-table">
      <thead>
        <tr>
          <th>Líder</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Cédula</th>
          <th>Municipio</th>
          <th>Barrio</th>
          <th>Dirección</th>
          <th>Municipio</th>
          <th>P. de votación</th>
          <th>M. de votación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {surveyed &&
          surveyed.map((surveyed, i) => {
            return <TableBodySurveyed surveyed={surveyed} key={i} />;
          })}
      </tbody>
    </table>
  );
};
