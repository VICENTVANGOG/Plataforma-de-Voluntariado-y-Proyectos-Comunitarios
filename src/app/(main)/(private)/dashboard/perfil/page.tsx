"use client"
import { useSession} from 'next-auth/react';
import ProfileTemplate from '@/UI/template/ProfileTemplate/ProfileTemplate';

const PerfilPage: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  if (!session?.user) {
    return (
      <div>
        <p>Debes iniciar sesión para ver esta página.</p>
      
      </div>
    );
  }


  const handleSubmit = (data: { name: string; email: string; role: string; password: string }) => {
    // Aquí puedes manejar el envío de datos, como actualizar la base de datos o API
    console.log("Datos del perfil actualizados:", data);
  };

  return (
    <ProfileTemplate 
      photo={session.user?.photo || "https://via.placeholder.com/150"} 
      name={session.user?.name || ""} 
      email={session.user?.email || ""} 
      role={session.user?.role || "user"}  // Aquí asumir que el rol es parte de la sesión
      onSubmit={handleSubmit} 
    />
  );
};

export default PerfilPage;
