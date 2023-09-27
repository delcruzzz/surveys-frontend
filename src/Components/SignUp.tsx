import { FC, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { apiUrl } from "../constants";

type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }): JSX.Element => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const toggleRole = (role: number) => {
    setSelectedRoles([role as never]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const submitData = (data: any) => {
    let params = {
      name: data.name,
      cellPhoneNumber: data.cellPhoneNumber,
      identityCard: data.identityCard,
      password: data.password,
      rolesId: selectedRoles,
    };
    axios
      .post(`${apiUrl}/users`, params, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .then(function (response) {
        toast.success("Usuario registrado con éxito!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        reset();
        history.push("/login");
        return response as AxiosResponse;
      })

      .catch(function (error) {
        toast.error("Error al registrar usuario!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        return error as AxiosError;
      });
  };
  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Formulario de Registro
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="">
                    <label className="form-label">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput1"
                      {...register("name", {
                        required: "Nombre es requerido!",
                      })}
                    />
                    {errors.name && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="">
                    <label className="form-label">Número de Celular</label>
                    <input
                      type="cellPhoneNumber"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("cellPhoneNumber", {
                        required: "Número de célular es requerido!",
                      })}
                    />
                    {errors.cellPhoneNumber && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.cellPhoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="">
                    <label className="form-label">Número de Cédula</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput4"
                      {...register("identityCard", {
                        required: "Cédula es requerida!",
                      })}
                    />
                    {errors.identityCard && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.identityCard.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput5"
                      {...register("password", {
                        required: "Contraseña es requerida!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <label className="form-label text-center">
                    Selecciona tu Cargo:
                  </label>
                  {[
                    { id: 1, name: "Líder" },
                    { id: 2, name: "Encuestador" },
                  ].map((item) => (
                    <div key={item.id}>
                      <label>
                        <input
                          type="radio"
                          name="role"
                          value={item.id}
                          onChange={() => toggleRole(item.id)}
                        />
                        {item.name}
                      </label>
                    </div>
                  ))}
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Registrase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
