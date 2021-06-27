import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";
import Room from "./pages/Room";
import AdminRoom from "./pages/AdminRoom";

import AuthContextProvider from './contexts/Auth';
import ModalContextProvider from './contexts/Modal';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/room/:id" component={Room} />

          <Route path="/admin/room/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
