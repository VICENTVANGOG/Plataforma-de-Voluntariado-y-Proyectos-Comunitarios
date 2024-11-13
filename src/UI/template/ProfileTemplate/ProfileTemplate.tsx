
import React from 'react';
import UserProfileCard from '@/UI/organims/UserProfileCard/UserProfileCard';

interface ProfileTemplateProps {
  photo: string;
  name: string;
  email: string;
  role: string;
  onSubmit: (data: { name: string; email: string; role: string; password: string }) => void;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ photo, name, email, role, onSubmit }) => {
  return (
    <div className="profile-template">
      <UserProfileCard 
        photo={photo} 
        name={name} 
        email={email} 
        role={role} 
        onSubmit={onSubmit} 
      />
    </div>
  );
};

export default ProfileTemplate;
