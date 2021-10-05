import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import Privado from './components/Privado';
import Registro from './components/Registro';
import {auth} from './firebase'


function App() {
const [user, setUser] = React.useState(false)

React.useEffect(
  ()=>{
    auth.onAuthStateChanged(
      user=>{
        if (user) {
          setUser(user)
        }else{
          setUser(null)
        }
      }
    )
  }
)
  return user !== false ? (

    <Router>
      <Navbar  userLogin={user}/>
        <Switch>
          <Route path="/" exact>
            inicio
          </Route>
          <Route path="/login">
            <Registro/>
          </Route>
          <Route path="/privado" >
            <Privado/>
          </Route>
        </Switch>
     
    </Router>
  ) : (
    <div>
      Cargando...
    </div>
  )
}

export default App;
