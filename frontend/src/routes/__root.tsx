import { Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar";

export default function Root(){
    return (
        <div>
            <Navbar/>
            <div className="p-6">
                <Outlet/>
            </div>
        </div>
    )
}