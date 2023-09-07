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
    <table className="table">
      <thead>
        <tr>
          <th>LIDER</th>
          <th>NOMBRE</th>
          <th>TELEFONO</th>
          <th>CEDULA</th>
          <th>MUNICIPIO</th>
          <th>BARRIO</th>
          <th>DIRECCION</th>
          <th>MUNICIPIO</th>
          <th>PUESTO VOTACION</th>
          <th>MESA</th>
          <th>ACCIONES</th>
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
