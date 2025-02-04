import { useAuth } from "../../../auth/hooks";

export const Navbar = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt"></i>
          &nbsp; Bienvenido@
        </span>
        <button className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i>
          <span onClick={logout}>Salir</span>
        </button>
      </div>
    </>
  );
};
