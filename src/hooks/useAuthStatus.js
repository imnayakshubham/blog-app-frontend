import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const useAuthStatus = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    const [isUserLoggedIn, setisUserLoggedIn] = useState(!!userInfo?.uid)

    useEffect(() => {
        if (userInfo?.uid) {
            setisUserLoggedIn(true)
        } else {
            setisUserLoggedIn(false)
        }
    }, [userInfo?.uid])
    
    return { isUserLoggedIn }
}
