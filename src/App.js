import React, { Component, Fragment } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react';
import CssBaseline from '@material-ui/core/CssBaseline';
/* import logo from './logo.svg'; */
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import Login from './pages/Login'
import Register from './pages/Register';
import Home from './pages/Home';
//import { ResponsiveDrawer } from './components/Drawer';
import ResponsiveDrawer from './pages/ResponsiveDrawer';
import AppDetail from './pages/AppDetail';
class App extends Component {
  render() {
    const { authStore, history } = this.props;
    const authenticated = authStore.authenticated;
    return (<ResponsiveDrawer>
      <Switch>

        {/* <Route exact path="/"  render={()=>{
           
              
              return (<h1 onClick={()=>{
                history.push("/auth/login");
              }}>Sorry, this page does not exist</h1>);
              //return (<Redirect  to="/auth/login" />);
            }} /> */}
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/" component={Home} />
        <Route exact path="/apps/:appId" component={AppDetail} />
        <Redirect to="/" />

        {/* <Route exact render={()=>{
              
              return (<h1>Sorry, this page does not exist</h1>);
            }} /> */}

      </Switch>
    </ResponsiveDrawer>);
  }

}
//
export default withRouter(inject('authStore')(
  observer(App)
));
