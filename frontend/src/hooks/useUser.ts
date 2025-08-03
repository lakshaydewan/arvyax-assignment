import type { User } from "@/lib/types"
import axios from "axios"
import { useEffect, useState } from "react"

export const useUser = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isValid, setIsValid] = useState<boolean>(false)

    const getUser = async () => {
        // get Token from localStorage
        const token = localStorage.getItem("authToken")

        if (!token) {
            setError("No token found")
            setLoading(false)
            return
        }

        try {
            const res = await axios.get("http://localhost:3000/api/auth/me", {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            setUser(res.data)
            setIsValid(true)
            setLoading(false)
        } catch (err: any) {
            console.error("Error fetching user:", err)
            setError(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return {
        user,
        loading,
        error,
        isValid,
    }
}