import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <h1>Not found - 404</h1>
      <button onClick={handleGoBack}>Go back</button>
    </>
  );
};

export default NotFound;
