import { Navbar } from "../components";

interface Props {
  children: React.JSX.Element;
}
export const AppLayout = ({ children }: Props) => {
  return (
    <main>
      {/* NAVBAR */}
      <Navbar />
      <div className="container">{children}</div>
    </main>
  );
};
