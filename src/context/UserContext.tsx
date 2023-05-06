import {createContext, useState,ReactNode, useEffect} from 'react'
import axios from "axios"


interface UserContextProviderProps {
    username: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | null>>;
    id: number | null;
    setId: React.Dispatch<React.SetStateAction<number | null>>
}

export const UserContext= createContext<UserContextProviderProps> ({
    username: null,
    setUsername: () => {},
    id: null,
    setId: () => {}
})


export const UserContextProvider:React.FC<{children: ReactNode}> = ({children}) => {
    const [username, setUsername] = useState<string | null>(null)
    const [id, setId] = useState<number | null>(null)

    useEffect (() => {
        axios.get('/profile', {withCredentials: true})
        .then(res => {
            setId(res.data.userId)
            setUsername(res.data.username)
        }
            )
    }, [])


    
    return (
        <>
        <UserContext.Provider value={{username, setUsername, id, setId}} >
            {children}
        </UserContext.Provider>

        </>
    )
}

