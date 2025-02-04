import { useState } from "react";
import { useAuth } from "../hooks";
import { useApi } from "../../calendar/hooks/useApi";
import Swal from "sweetalert2";
import styles from "./styles.module.css";

export const LoginPage = () => {
  const { validateLogin } = useApi<any, any>(
    `${import.meta.env.VITE_API_URL}/auth`,
    "usuarios",
    false
  );
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleOnSubmit = () => {
    event?.preventDefault();
    const mutation = validateLogin;

    Swal.fire({
      title: "Procesando...",
      text: "Validando credenciales...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    mutation.mutate(formData, {
      onSuccess: (data) => {
        setTimeout(() => {
          Swal.fire({
            title: "Credenciales validas",
            text: "Validacion exitosa",
            icon: "success",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              login(data);
            },
          });
        }, 1500); // 1500 ms (1.5 segundos)
      },
      onError: (error: any) => {
        Swal.fire("Error", error.response.data.msg  || error.response.data.errors.email.msg, "error");
      },
    });
  };
  const onInputChange = (event: any) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`col-md-6 ${styles["login-form-1"]}`}>
          <h3>Ingreso</h3>
          <form onSubmit={handleOnSubmit}>
            <div className="form-group mb-2">
              <input
                value={formData.email}
                name="email"
                type="text"
                className="form-control"
                placeholder="Correo"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                value={formData.password}
                name="password"
                type="password"
                className="form-control"
                placeholder="Contraseña"
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className={`btnSubmit ${styles.btnSubmit}`}
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
