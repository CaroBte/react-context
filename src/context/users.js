import React, { createContext, useState } from 'react'
import { users as usersApi } from "../api"

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        try {
            setData(null)
            setIsLoading(true)
            const res = await usersApi.getUsers()
            setIsLoading(false)
            setData(res.data)
        } catch (error) {
            setIsLoading(false)
            setError(error.message)
        }
    }

    const state = { data, error, isLoading }
    const dispatchers = { getData }

    return (
        <>
            <UsersContext.Provider value={state}>
                {children}
            </UsersContext.Provider>

        </>
    )
}