import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { useAppSelector } from "../../stores/hooks";
import { isTokenAdmin, selectToken, setToken } from "../../stores/jwtTokenSlice";


const Main = ({children}: any) => {
    
    const tokenStore = useAppSelector(selectToken);
    const location = useLocation()
    const dispatch = useDispatch()

    if (tokenStore === null) {
        return <Navigate to={"/login"} replace state={{ from: location }} />
    } else {
        let decodedToken: any = jwtDecode(JSON.parse(JSON.stringify(tokenStore)).accessToken)
        let currentDate = new Date()
        if ((decodedToken.exp * 1000) < currentDate.getTime()) {
            dispatch(setToken(null as any));
            return <Navigate to={"/login"} replace state={{ from: location }} />
        } else {
            //dispatch(setUser(decodedToken.user))
        }
    }

    return children
}

export default Main