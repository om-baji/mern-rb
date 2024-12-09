
export const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-neutral-800 text-white'>
            <h1 className='text-4xl font-bold text-zinc-100 mb-4'>Something went wrong</h1>
            <p className='text-zinc-400 mb-6'>An unexpected error has occurred. Please try again later.</p>
            <button
                onClick={() => window.location.reload()}
                className='px-6 py-2 bg-zinc-100 text-neutral-800 font-semibold rounded-md shadow hover:bg-zinc-200 transition'
            >
                Reload Page
            </button>
        </div>
    )
}