import React, { useState } from 'react';
import styles from './UserProfileCard.module.scss';

interface UserProfileCardProps {
  photo: string;
  name: string;
  email: string;
  password: string;
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ photo, name, email, password, onSubmit }) => {
  const [editableName, setEditableName] = useState(name);
  const [editableEmail, setEditableEmail] = useState(email);
  const [editablePassword, setEditablePassword] = useState(password);

  const handleSave = () => {
    onSubmit({
      name: editableName,
      email: editableEmail,
      password: editablePassword,
    });
  };

  return (
    <div className={styles.profileCard}>
      {/* Título del perfil */}
      <h2 className={styles.title}>Perfil del Usuario</h2>

      <div className={styles.photoSection}>
        <img src={photo} alt="User Photo" className={styles.photo} />
        <button className={styles.changeButton}>Change Photo</button>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.field}>
          <label>Name</label>
          <input
            type="text"
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input
            type="email"
            value={editableEmail}
            onChange={(e) => setEditableEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={editablePassword}
            onChange={(e) => setEditablePassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
      </div>

      <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default UserProfileCard;
