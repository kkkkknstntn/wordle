import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectCurrentUserState } from "./userSlice";
import { selectCurrentGameState } from "./gameSlice";

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
    const { children } = props
    // const isLoggedIn: boolean = localStorage.getItem('logged_user') !== null;
    const { isAuthenticated } = useSelector(selectCurrentUserState)
    const { isGameWithoutAuth } = useSelector(selectCurrentGameState)
    console.log("ис ауф" + isAuthenticated)
    const location = useLocation()
    return isAuthenticated ? (
      
      <>{console.log("ЧТО ЭТО БЛЯТЬ " + isAuthenticated)}
      {children}</>
    ) : (
      isGameWithoutAuth ?
      <>{console.log("what " + isAuthenticated)} {children}</>
      : 
        <Navigate
          replace={true}
          to="/"
          state={{ from: `${location.pathname}${location.search}` }}
        />
    )
}

export default PrivateRoute