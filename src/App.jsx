import React, {useEffect} from 'react';
import {firebase} from './firebase'
import './App.css';

function App() {

  useEffect(() => {
    const obtenerProyectos = async()=>{
      try {
        const db = firebase.firestore()
        const data = await db.collection('proyectos').get()
        console.log(data.docs);
        
      } catch (error) {
        console.log("--------------"+error);
      }
    }
   obtenerProyectos()
   
  }, [])
  return (
    <div className="container">
     
    </div>
  );
}

export default App;
