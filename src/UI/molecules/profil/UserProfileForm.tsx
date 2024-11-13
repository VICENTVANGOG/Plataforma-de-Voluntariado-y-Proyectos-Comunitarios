// src/components/molecules/UserProfileForm.tsx
import React, { useState } from 'react';
import { Input } from '@/UI/atoms/index';  // Importamos el Input

interface UserProfileFormProps {
  name: string;
  email: string;
  role: string;
  onSubmit: (data: { name: string; email: string; role: string; password: string }) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ name, email, role, onSubmit }) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPassword, setUserPassword] = useState('');
  const [userRole, setUserRole] = useState(role);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail || !userPassword || !userRole) {
      setError('Todos los campos son obligatorios');
    } else {
      setError(null);
      onSubmit({ name: userName, email: userEmail, role: userRole, password: userPassword });
    }
  };

  return (
    <form className="user-profile-form" onSubmit={handleSubmit}>
      <Input 
        placeholder="Nombre" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)} 
        error={error && !userName ? "El nombre es obligatorio" : undefined}
      />
      <Input 
        placeholder="Correo electrónico" 
        type="email" 
        value={userEmail} 
        onChange={(e) => setUserEmail(e.target.value)} 
        error={error && !userEmail ? "El correo es obligatorio" : undefined}
      />
      <Input 
        placeholder="Contraseña" 
        type="password" 
        value={userPassword} 
        onChange={(e) => setUserPassword(e.target.value)} 
        error={error && !userPassword ? "La contraseña es obligatoria" : undefined}
      />
      <div className="flex flex-col mb-4">
        <label htmlFor="role" className="mb-2">Rol</label>
        <select
          id="role"
          name="role"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
        </select>
        {error && !userRole && <p className="mt-1 text-sm text-red-500">El rol es obligatorio</p>}
      </div>
      <button type="submit" className="btn-primary">Guardar cambios</button>
    </form>
  );
};

export default UserProfileForm;
