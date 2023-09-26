import { FC } from "react";
import "./home.css";
import { Link, useHistory } from "react-router-dom";
import { TableSurveyed } from "./TableSurveyed";
import { AuthUserResponse } from "../redux/interfaces/authInterface";
import { useCustomDispatch } from "../redux/hooks/useRedux";
import { setOpenModalCreateRespondent } from "../redux/slices/surveyedSlice";
import { CreateSurveyedModal } from "./modals/CreateSurveyedModal";

const Home: FC<JSX.Element[]> = () => {
  const dispatch = useCustomDispatch();
  const history = useHistory();
  const userLogged: AuthUserResponse = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  setTimeout(function () {
    localStorage.clear();
    history.push("/login");
  }, 300000);

  const validRole = userLogged.roles.find((role) => role.name === "SUPERADMIN");

  return (
    <>
      <header className="flex md:flex-row flex-col-reverse items-center md:justify-between px-8 py-2 gap-3 my-2">
        <div className="">
          <h1 className="uppercase text-4xl">votantes</h1>
          <p className="">
            LÍDER: {userLogged.name}, CEL: {userLogged.cellPhoneNumber}, CC:{" "}
            {userLogged.identityCard}
          </p>
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-300 px-8 py-2 rounded-lg"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      <main className="content-main">
        <button
          className="btn btn-success mb-3"
          onClick={() => dispatch(setOpenModalCreateRespondent(true))}
        >
          Agregar Votante
        </button>

        {validRole ? (
          <Link to="signup" className="btn btn-primary mb-3 mx-3">
            Crear usuario
          </Link>
        ) : null}
        <TableSurveyed />
      </main>
      <CreateSurveyedModal />
    </>
  );
};

export default Home;
