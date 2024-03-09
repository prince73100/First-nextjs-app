export default function Profile({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">profile page <span className="ml-4 rounded bg-orange-500 ">{params.id}</span></p>
        </div>
    )
}