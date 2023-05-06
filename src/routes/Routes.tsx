import {useContext} from 'react'
import {UserContext} from "../context/UserContext"
import Register from '../components/Register'
import Chat from '../components/Chat'
export const Routes = () => {

    const {username, id} = useContext(UserContext)


    if (username) {
        return (
            <>
            <Chat />
            </>
        )
    }

    return (
        <>
        <Register />
        </>
    )
}

export default Routes