import { useEffect } from "react"
import { logout } from "../../API/AuthAPI"
import { useNavigate } from "react-router-dom"

export default function LogOut(){
    const navigate = useNavigate()
    useEffect(()=>{
        logout()
        navigate('/')
    },[])
    return (
        <>
        <div className="container mt-5">
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Logging out</span>
                </div>
                <p className="mt-3">Logging out...</p>
            </div>
        </div>
        </>
    )
}