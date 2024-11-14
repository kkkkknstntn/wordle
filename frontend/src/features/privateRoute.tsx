import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectCurrentUserState } from "./userSlice";

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    // const isLoggedIn: boolean = localStorage.getItem('logged_user') !== null;
    const { isAuthenticated } = useSelector(selectCurrentUserState)
    const location = useLocation()
    return isAuthenticated ? (
      <>{children}</>
    ) : (
      <Navigate
        replace={true}
        to="/"
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
}

export default PrivateRoute