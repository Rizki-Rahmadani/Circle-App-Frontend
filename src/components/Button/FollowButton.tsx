import { toggleFollow } from "@/features/dashboard/services/follow.services";
import React, { useState } from "react";

interface FollowButtonProps {
  userId: number; // ID pengguna yang ingin di-follow/unfollow
  isFollowing: boolean; // Status apakah sudah di-follow
  onFollowSuccess: (userId: number) => void;
  onUnfollowSuccess: (userId: number) => void;
  buttonStyles?: React.CSSProperties;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isFollowing,
  onFollowSuccess,
  onUnfollowSuccess,
  buttonStyles,
}) => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('auth-token');

  const handleFollowToggle = async () => {
    if (!token) {
      alert('Anda perlu login untuk melakukan aksi ini.');
      return;
    }
  
    setLoading(true);
    try {
      await toggleFollow(userId, token);
      isFollowing ? onUnfollowSuccess(userId) : onFollowSuccess(userId);
    } catch (error) {
      console.error('Error toggling follow:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };  

  const buttonColor = isFollowing ? 'text-green-500' : 'text-white';
  const buttonText = isFollowing ? 'Unfollow' : 'Follow';

  return (
    <button
      onClick={handleFollowToggle}
      disabled={loading}
      style={{ ...buttonStyles }}
      className={`follow-btn ${buttonColor} rounded-full`}
    >
      {loading ? 'Loading...' : buttonText}
    </button>
  );
};

export default FollowButton;