import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUserState } from "./userSlice";
import { selectCurrentGameState } from "./gameSlice";

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    const { isAuthenticated } = useSelector(selectCurrentUserState)
    const { isGameWithoutAuth } = useSelector(selectCurrentGameState)
    const location = useLocation()
    return isAuthenticated ? (
      
      <>
      {children}</>
    ) : (
      isGameWithoutAuth ?
      <> {children}</>
      : 
        <Navigate
          replace={true}
          to="/"
          state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default PrivateRoute