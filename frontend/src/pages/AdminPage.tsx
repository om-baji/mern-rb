import React from 'react'
import { useQuery } from "@tanstack/react-query"
import DashboardGrid from '../components/DashboardGrid'
import toast from 'react-hot-toast'
import { ErrorPage } from '../components/Errorpage'

const AdminPage = () => {

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/api/admin/users", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" }
            })

            if (!response.ok) throw new Error("Something went wrong!")
            console.log(response.json)
            return response.json()
        },
    })

    if(isError) {
        toast.error("Error occured!")
        console.log(error)
        return <ErrorPage />
    }

    return (
        <>
            {isLoading ? (<DashboardGrid leftBody='Details' rightTitle='Loading...' content={null} />)
                : (<DashboardGrid leftBody='Details' rightTitle='Users Table' content={data.users} />)}

        </>
    )
}

export default AdminPage
