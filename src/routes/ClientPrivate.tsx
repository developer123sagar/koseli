import { Outlet, Navigate } from "react-router-dom";

export type Role = "admin" | "organizer" | "restaurant" | "watcher" | "";

interface PrivateRoutesProps {
  role: Role;
  token: string | null;
}

const allowedRoles: Role[] = ["admin", "organizer", "restaurant", "watcher"];

const ClientPrivate: React.FC<PrivateRoutesProps> = ({ token, role }) => {
  if (token && allowedRoles.includes(role!)) {
    return <Navigate to="/dashboard"/>
  } else {
    return <Outlet/>;
  }
};

export default ClientPrivate;
