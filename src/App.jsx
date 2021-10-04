import React, {useEffect, useState} from 'react';
import {firebase} from './firebase'
import './App.css';

function App() {

  const [datos, setDatos] = useState([])
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [id, setId] = useState("")

  const [edicion, setEdicion] = useState(false)

  useEffect(() => {
    const obtenerProyectos = async()=>{
      try {
        const db = firebase.firestore()
        const data = await db.collection('proyectos').get()
        const arrayProyectos = data.docs.map(
          doc => ({id: doc.id, ...doc.data()})
        )
        setDatos(arrayProyectos)
        
      } catch (error) {
        console.log(error);
      }
    }
   obtenerProyectos()
  }, [])

  const editar = (item)=>{
    setEdicion(true)
    setId(item.id)
    setNombre(item.nombre)
    setDescripcion(item.descripcion)
  }

  const eliminar = (item)=>{
    try {
      
    } catch (error) {
      
    }
  }

  const agregar = async(e)=>{
    e.preventDefault()
  
    try {
      const db = firebase.firestore()
      const proyecto = {
        nombre,
        descripcion
      }
     
      const datosGuardar = await db.collection('proyectos').add(proyecto)
      setDatos([
        ...datos,
        {
          id: datosGuardar.id,
          ...proyecto
        }
       
      ])
    } catch (error) {
      console.log(error);
    }
  }

  const actualizar = async (e) => {
    e.preventDefault()
    const proyecto = {
      nombre,
      descripcion
    }

    const db = firebase.firestore()
    await db.collection('proyectos').doc(id).update(proyecto)
  }

  return (
    <div className="container">

      <div className="row">
        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Formulario</h5>
              <form onClick={edicion ? actualizar : agregar}>
                <div className="form-group">
                  <label >Nombre</label>
                  <input type="text" className="form-control" placeholder="Nombre proyecto" value={nombre} onChange={e => setNombre(e.target.value)}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label >Descripción</label>
                  <input type="text" className="form-control" placeholder="Descripción" value={descripcion}  onChange={e => setDescripcion(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary mt-2">Guardar datos</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Lista de proyectos</h5><hr />
              <table className="table table-hover text-center">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">DESCRIPCION</th>
                    <th scope="col">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    datos.map((item, index)=>(
                      <tr key={item.id}>
                      <th scope="row">{index+1}</th>
                      <td>{item.nombre}</td>
                      <td>{item.descripcion}</td>
                      <td>
                        <button type="button" className="btn btn-outline-primary btn-sm m-2" onClick={()=>editar(item)}>Editar</button>
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={()=>eliminar(item.id)}>Eliminar</button>
                      </td>
                    </tr>
                    ))
                  }
                
                </tbody>
              </table>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
