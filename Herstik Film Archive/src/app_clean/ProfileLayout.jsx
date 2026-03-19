import {Outlet} from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader"
import ProfileNavBar from "../components/ProfileNavBar"

export default function ProfileLayout(){

    return(
    <div className="profile-page">

        <ProfileHeader/>
        <ProfileNavBar/>

        <div className="profile-content">

            <Outlet/>
        
        </div>
    </div>
    )
} 