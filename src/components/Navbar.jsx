import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
    console.log(props.userLogin);
    const cerrarSesion = ()=>{
        auth.signOut()
        .then(()=>{
            props.history.push('/login')
        })
    }
    return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <Link className="nav-link" to="/" >Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                   <Link className="nav-link" to="/" exact>inicio</Link>
                </li>
                <li className="nav-item">
                    {
                        props.userLogin !== null ? (
                            <button className="nav-link" onClick={() => cerrarSesion} >Salir</button>
                        ) : (
                            <Link className="nav-link" to="/login" >Login</Link>
                        )
                    }
                    
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/privado" >privado</Link>
                </li>
                </ul>
            </div>
            </nav>
      
        
    )
}

export default withRouter(Navbar)
