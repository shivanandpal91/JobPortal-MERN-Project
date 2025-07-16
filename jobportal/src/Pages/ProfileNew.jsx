import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";

const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";

function ProfileNew() {
  const userEmail = localStorage.getItem("loggedInUserEmail");
  const userName = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: userName || "",
    email: userEmail || "",
    phone: "",
    location: "",
    education: "",
    experience: "",
    bio: "",
    linkedin: "",
    github: "",
    portfolio: "",
    resume: "",
    profilePicture: "",
    appliedJobs: [],
  });

  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`https://job-portal-server-api.vercel.app/user/${userEmail}`, {
        headers: {
          Authorization: token,
        },
      });

      const result = await res.json();
      if (res.ok) setUser((prev) => ({ ...prev, ...result }));
      else alert(result.message || "Failed to load profile");
    } catch (err) {
      console.error("Error fetching profile:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userEmail && token) fetchUserProfile();
    else setLoading(false);
  }, [userEmail, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://job-portal-server-api.vercel.app/user/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Profile updated successfully!");
      setUser(result.user);
    } else {
      alert(result.message || "Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  if (loading) return <p className="text-center py-10">Loading profile...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate("/")}
          className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg flex items-center gap-1"
        >
          ← Back to Home
        </button>
      </div>

      {/* Logout Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow transition"
        >
          🚪 Logout
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">👤 My Profile</h1>

      <div className="flex flex-col md:flex-row gap-8 bg-white p-8 shadow-xl rounded-xl mb-10">
        {/* Profile Picture */}
        <div className="flex flex-col items-center w-full md:w-1/3">
          <img
            src={user.profilePicture || defaultAvatar}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full border-4 border-indigo-500 shadow"
          />
          <label className="mt-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded transition duration-200">
            Change Picture
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["Name", "name"],
            ["Phone", "phone"],
            ["Location", "location"],
            ["Education", "education"],
            ["Experience", "experience"],
            ["LinkedIn URL", "linkedin"],
            ["GitHub URL", "github"],
            ["Portfolio URL", "portfolio"],
            ["Resume Link", "resume"],
          ].map(([label, field]) => (
            <div key={field}>
              <label className="block text-indigo-700 font-semibold mb-1">{label}</label>
              <input
                name={field}
                value={user[field]}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={label}
              />
              {["linkedin", "github", "portfolio"].includes(field) && user[field] && (
                <a
                  href={user[field]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded hover:bg-indigo-200"
                >
                  🔗 Visit {label.split(" ")[0]}
                </a>
              )}
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-indigo-700 font-semibold mb-1">Email</label>
            <input
              value={user.email}
              readOnly
              className="bg-gray-100 border px-3 py-2 rounded w-full cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-indigo-700 font-semibold mb-1">Short Bio</label>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition"
            >
              💾 Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* Applied Jobs */}
      <div>
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">📌 Jobs You've Applied To</h2>
        {user.appliedJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.appliedJobs.map((job, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50 hover:shadow transition">
                <p className="font-bold text-indigo-600 text-lg">{job.jobTitle}</p>
                <p className="text-gray-800">{job.companyName}</p>
                {job.appliedAt && (
                  <p className="text-sm text-gray-500">
                    Applied on: {new Date(job.appliedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfileNew;
