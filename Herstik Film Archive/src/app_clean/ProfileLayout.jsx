import { Outlet, useParams } from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader"
import ProfileNavBar from "../components/ProfileNavBar"
import { useEffect, useState } from "react"
import { getProfileByUserId } from "../services/profileService"

export default function ProfileLayout() {

    const { userId } = useParams()

    const [profile, setProfile] = useState(null)
    const [loadingProfile, setLoadingProfile] = useState(true)

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await getProfileByUserId(userId)
                setProfile(data)
            } catch (err) {
                console.log("failed to laod profile", err.message)
            } finally {
                setLoadingProfile(false)
            }
        }
        if (userId) {
            loadProfile()
        }
    }, [userId])

    if (loadingProfile) return <p>Loading profile...</p>;
    if (!profile) return <p>Profile not found.</p>;

    return (
        <div className="profile-page">

            <ProfileHeader profile={profile} />
            <ProfileNavBar />

            <div className="profile-content">

                <Outlet context={{profile}} />

            </div>
        </div>
    )
} 