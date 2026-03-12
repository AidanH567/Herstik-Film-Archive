export default function ProfileHeader() {
  return (
    <div className="profile-summary">

      <div className="profile-summary-img">
        <img src="../public/profile-photo.jpg" alt="" />
      </div>

      <div className="profile-summary-info">
        <h2>Username</h2>
        <p>Member since: January 2024</p>
        <p>Bio: This is a short bio for the user.</p>
      </div>

      <div className="profile-summary-stats">
        <span>Films</span>
        <span>This Year</span>
        <span>Lists</span>
        <span>Following</span>
        <span>Follwers</span>
      </div>

    </div>
  )
}