import { Outlet, Navigate } from "react-router-dom";

export type Role = "admin" | "organizer" | "restaurant" | "watcher" | "";

interface PrivateRoutesProps {
  role: Role;
  token: string | null;
}

const allowedRoles: Role[] = ["admin", "organizer", "restaurant", "watcher"];

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ token, role }) => {
  if (token && allowedRoles.includes(role!)) {
    return <Outlet />;
  } else {
    return <Navigate to="/admin/login" />;
  }
};

export default PrivateRoutes;
