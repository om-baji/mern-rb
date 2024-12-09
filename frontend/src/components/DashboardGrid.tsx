import React from 'react'

type User = {
    name: string
    email: string
    createdAt: Date
}

const DashboardGrid = ({
    leftBody,
    rightTitle,
    content,
}: {
    leftBody: string
    rightTitle: string
    content: User[] | null
}) => {
    return (
        <div className='grid grid-cols-[30%_70%] h-screen'>
    
            <div className='flex justify-center items-center bg-zinc-100 text-lg font-semibold'>
                {leftBody}
            </div>

            <div className='flex flex-col gap-6 p-6 bg-neutral-800 text-white'>

                <h1 className='text-2xl font-bold'>{rightTitle}</h1>

                <div className='flex flex-col gap-4 w-full'>
                    {content && content.length > 0 ? (
                        content.map((user, index) => (
                            <div
                                key={index}
                                className='bg-neutral-900 p-4 rounded-md shadow-md border border-neutral-700'
                            >
                                <h2 className='text-xl font-semibold text-zinc-100'>
                                    {user.name}
                                </h2>
                                <p className='text-zinc-400'>{user.email}</p>
                                <p className='text-sm text-zinc-500 mt-2'>
                                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className='text-zinc-400'>No users available</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashboardGrid
