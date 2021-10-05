import React from 'react'
import { auth } from '../firebase'
import { withRouter } from 'react-router-dom'

const Privado = (props) => {

    const [usuario, setUsuario] = React.useState('')

    React.useEffect(() => {
        if (auth.currentUser) {
            console.log(auth.currentUser);
            setUsuario(auth.currentUser)
        }else{
            console.log('no logueado');
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            <h1>ventana privada</h1>
            {
                usuario &&(
                    <h1>{usuario.email}</h1>
                )
            }
            
            
        </div>
    )
}

export default withRouter(Privado)
