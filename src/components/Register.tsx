import { FcGoogle } from 'react-icons/fc';
import {useState, ChangeEvent, useContext} from 'react'
import axios from "axios"
import {UserContext} from "../context/UserContext"

const Register = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoginOrRegister, setIsLoginOrRegister] = useState<string>('register')

    const {setUsername: setLoggedInUsername, setId} = useContext(UserContext)

    async function handleSubmit (e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        const url = isLoginOrRegister === "register" ? "register" : "login"
        const {data} = await axios.post(url, {username, password})
        setLoggedInUsername(username)
        setId(data.id)
        console.log({"login": data})
        
    }
        return (
            <>
            <div className="relative flex text-gray-700 antialiased justify-center overflow-hidden bg-gray-50 py-5 sm:py-10">
                <form
                    className="w-full max-w-sm"
                    onSubmit={handleSubmit}
                >
                    <div className="relative py-3 sm:w-96 text-center">
                        <span className="text-2xl font-semibold gray-700 ">Login to your account</span>
                        <div className="mt-4 bg-white shadow-md rounded-lg text-left">
                            <div className="h-2 bg-yellow-400 rounded-t-md"></div>
                            <div className="px-8 py-6 ">

                                <label className="gray-700 font-semibold"> Username </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="username"
                                    onChange = {e => setUsername(e.target.value)}
                                    value={username}
                                    className="border w-full h-3 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />


                                <label className="block gray-700 mt-3 font-semibold"> Password </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    onChange = {e => setPassword(e.target.value)}
                                    value={password}
                                    className="border w-full h-3 px-3 py-4 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md" />

                                <div className="flex flex-col gap-4">
                                    <button type="submit" className="mt-4 bg-yellow-400 text-gray-700  py-2 px-6 rounded-md font-medium hover:bg-yellow-400 ">
                                        {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                                    </button>


                                    <button className=" bg-gray-700 py-2 px-6 w-full  rounded-lg flex align-middle gap-5">
                                        <FcGoogle className="text-3xl" />
                                        <a href="" className="no-underline font-medium text-white ">Sign in with Google</a>
                                    </button>

                                </div>
                                <div className="text-center mt-2">
                                    {isLoginOrRegister === 'register' && (
                                    <div>
                                        Already a member? 
                                    <button
                                    onClick={() => setIsLoginOrRegister('login')}
                                    >Login
                                    </button>
                                    </div>
                                    )}

                                    {isLoginOrRegister === 'login' && (
                                    <div>
                                        Don't have an account? 
                                    <button
                                    onClick={() => setIsLoginOrRegister('login')}
                                    >Register
                                    </button>
                                    </div>
                                    )}
                  
    
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
        )
}

export default Register