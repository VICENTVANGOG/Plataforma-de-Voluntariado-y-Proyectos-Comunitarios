import Button from "@/UI/atoms/button"
import './styles/navbar.scss'; 
import Link from "next/link";


export default function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__content">
            <div className="navbar__logo">
            <Link href="/">
  <h1 className="navbar__title">VolunteerConnect</h1>
            </Link>
            
            </div>
            <div className="navbar__menu">
              <div className="navbar__menu-items">
               
                    <Link href="/login">
                    <Button variant="text" className="navbar__button">Iniciar sesión</Button>
                    </Link>


                    <Link href="/register">
                    <Button variant="primary" className="navbar__button">Registrarse</Button>
                    </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

