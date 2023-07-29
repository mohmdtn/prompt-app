"use client";

import { Profile } from "@components/Profile";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const userData = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`, { cache: 'no-store' });
      const data = await response.json();
      setUserPosts(data);
    };
    userData();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`welcome to ${username} personilized profile page`}
      data={userPosts}
    />
  );
};

export default UserProfile;
