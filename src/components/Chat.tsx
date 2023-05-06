import {useEffect, useState, ChangeEvent, useContext} from 'react'
import {UserContext} from "../context/UserContext"

interface People {
    [key: number]: string, 
}

interface OnlinePeople {
    userId: number,
    username: string
}

const Chat = () => {


    const {username, id} = useContext(UserContext)
    const [onlinePeople, setOnlinePeople] = useState<OnlinePeople[]>([])
    const [selectedUserId, setselectedUserId] = useState<null | number>(null)
    const [newMessageText, setNewMessageText] = useState<string>("")

    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5050')
        if (ws !== null) {
            setWs(ws)
            ws.addEventListener('message', handleMessage)
        }
    }, [])

    const showOnlinePeople = (peopleArray: {userId: number, username:string}[]) => {

        const userIds = new Set<number>()
        const onlinePeopleArray = peopleArray
        .filter(({userId}) => {
            if(userIds.has(userId)) {
                return false
            }
            userIds.add(userId); 
            return true })
            .map(({userId, username}) => {
                return {
                    userId,
                    username
                }
            })
        const updatedOnlinePeople = onlinePeopleArray.filter(person => person.userId !== id)
        setOnlinePeople(updatedOnlinePeople)
    }


    console.log(onlinePeople)


    const handleMessage = (e: MessageEvent<any>) => {
            const messageData = JSON.parse(e.data)
            if ('online' in messageData) {
                showOnlinePeople(messageData.online)
            }
            }

    const handleSendMessage = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ws) {
            console.error('WebSocket is not initialized.');
            return;
        }
        ws.send(JSON.stringify({
            message: {
                recipient: selectedUserId,
                text: newMessageText,
            }
        }))
    }

    return (
        <>
        <div className="flex h-screen">
            <div className="bg-gray-100 w-1/3 p-2"> 
            <div 

            className="flex text-gray font-bold gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
                Chat App

            </div>
            {onlinePeople.map(({userId, username}) => (
                <div 
                key={userId}
                className={'border-b border-gray-100 py-2 cursor-pointer text-center ' + (userId === selectedUserId ? 'bg-gray-300' : '')}
                onClick={() => setselectedUserId(userId)}
                >
                    {username}
                </div>
            ))}
            </div>
            <div className=" flex flex-col bg-gray-300 w-2/3 p-2"> 
            <div className="flex-grow">
                {!selectedUserId && (
                    <div>Select a person</div>
                )}
                </div>
            <form 
            className="flex gap-2"
            onSubmit={handleSendMessage}
            >
                <input 
                className="border flex-grow bg-white rounded-sm p-2"
                type="text"
                placeholder="Type in message here"
                value={newMessageText}
                onChange={e => setNewMessageText(e.target.value)}
                />
                <button type="submit" className="bg-slate-400 p-2 text-white rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>

                </button>
                </form>
            </div>

        </div>
        </>
    )
} 

export default Chat