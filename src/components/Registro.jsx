import React, {useState} from 'react'
import {bd, auth} from '../firebase'
import { withRouter } from 'react-router-dom'

const Registro = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [registro, setRegistro] = useState(true)


    const enviarDatos = (e)=>{
        e.preventDefault()
        if (!email.trim() || !pass.trim()) {
            setError('error complete los campos')
            return false
        }
        if (pass.length < 6) {
            setError('largo de 6 ')   
            return false         
        }

        if (!registro) {
            registrarUsuario()
        }else{
            login()
        }
    }

    const registrarUsuario = React.useCallback(
        async () => {
            try {
                const  res = await auth.createUserWithEmailAndPassword (email,pass)
                if (res.isNewUser) {
                    setError('Registro creado exitosamente')
                }
                await bd.collection('usuarios').doc(res.user.uid).set(
                    {
                        email,
                        pass
                    }
                )
                setEmail('')
                setPass('')
            } catch (error) {
                console.log(error);
                if (error.code) {
                    setError(error.message)
                }
            }
        },[email,pass]
    )

    const login = React.useCallback(
        async () => {
            try {
              const res =   await auth.signInWithEmailAndPassword(email,pass)
              console.log(res);
              props.history.push('/privado')
            } catch (error) {
                console.log(error);
            }
        },[email,pass,props]
    )

    return (
        <div className="container col-12 col-sm-8 col-md-6 col-xl-4">
            <h4 className="text-center mt-3">{registro ? 'Iniciar sesión': 'Registro de usuario'}</h4>
            <form onSubmit={enviarDatos}>
                <div className="form-group">
                    <label>Correo</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese correo electronico" onChange={e =>setEmail(e.target.value)} value={email}/>
                    {/*<small id="emailHelp" className="form-text text-muted">Correo electronico requerido</small>*/}
                </div>
                <div className="form-group">
                    <label >Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" onChange={e =>setPass(e.target.value)} value={pass}/>
                </div>
                <div className="text-center m-3">
                <button type="submit" className="btn btn-success  m-1 col-12">{!registro ? 'Registrar' : 'Ingresar'}</button>
                <button type="button" className="btn btn-primary  m-1 col-12" onClick={()=>setRegistro(!registro)}>{!registro ? 'Iniciar sesión' : 'Quiero registrarme'}</button>
                </div>
                {
                    error ? (
                        <div className="alert alert-danger">{error}</div>
                    ):null
                }
            </form>
        </div>
       
    )
}

export default withRouter(Registro) 
