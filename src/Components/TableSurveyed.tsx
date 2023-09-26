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
    <div className="relative overflow-x-auto rounded-lg md:rounded-lg scrollbar-hide">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-2 py-3">Líder</th>
            <th scope="col" className="px-2 py-3">Nombre</th>
            <th scope="col" className="px-2 py-3">Teléfono</th>
            <th scope="col" className="px-2 py-3">Cédula</th>
            <th scope="col" className="px-2 py-3">Municipio</th>
            <th scope="col" className="px-2 py-3">Barrio</th>
            <th scope="col" className="px-2 py-3">Dirección</th>
            <th scope="col" className="px-2 py-3">Municipio</th>
            <th scope="col" className="px-2 py-3">P. de votación</th>
            <th scope="col" className="px-2 py-3">M. de votación</th>
            <th scope="col" className="px-2 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {surveyed &&
            surveyed.map((surveyed, i) => {
              return <TableBodySurveyed surveyed={surveyed} key={i} />;
            })}
        </tbody>
      </table>
    </div>
  );
};
