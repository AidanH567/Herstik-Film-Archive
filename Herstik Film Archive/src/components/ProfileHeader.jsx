export default function ProfileHeader({ profile }) {
  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";
    
  return (
    <div className="profile-summary">
      <div className="profile-summary-img">
        <img src="/profile-photo.jpg" alt={profile?.name || "Profile"} />
      </div>

      <div className="profile-summary-info">
        <h2>{profile?.name ? `${profile.name}'s Profile` : "Profile"}</h2>
        <p>Member since: {joinedDate || "—"}</p>
        <p>Bio: {profile?.bio || "No bio yet."}</p>
      </div>

      <div className="profile-summary-stats">
        <span>Films</span>
        <span>This Year</span>
        <span>Lists</span>
        <span>Following</span>
        <span>Followers</span>
      </div>
    </div>
  );
}