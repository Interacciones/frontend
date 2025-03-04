"use client";

import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";

function Profile() {
  const [userProfile, setUserProfile] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const { user } = UserAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users-self`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.stsTokenManager.accessToken}`,
        },
      });
      const result = await response.json();
      setUserProfile(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userProfile);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users-self`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.stsTokenManager.accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setUserProfile(result.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      {userProfile ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
          <h2 className="text-2xl font-semibold mt-4 text-blue-800">
            {userProfile.name} {userProfile.lastName}
          </h2>

          {!isEditing ? (
            <>
              <div className="mt-4 text-left space-y-2">
                <p><span className="font-semibold">Email:</span> {userProfile.email}</p>
              </div>
              <button
                onClick={handleEdit}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form className="mt-4 space-y-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded"
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;