export default function ProfileSettingsPage() { 
    return (
        <div className="profile-settings-page">
            <h1>Profile Settings</h1>

            <form action="">

                <div className="username-div">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" />
                </div>


            </form>
        </div>
    );
}