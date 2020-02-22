import React from 'react';
import { Route } from 'react-router';
import { History } from 'history';
// import logo from './logo.svg';
import './App.css';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import NewsFeed from './containers/NewsFeed';
import Profile from './containers/Profile';
import NavBar from './components/NavBar';
import services from './services'

interface IApp {
  history: History,
}

class App extends React.Component<IApp> {
  public state = {
    loading: true,
  }

  public componentDidMount() {
    const { auth } = services;
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (['/', '/register'].indexOf(window.location.pathname) > -1) {
          const { history } = this.props;
          history.push('/app/newsfeed');
        }
      } else {
        if (/\app\/./.test(window.location.pathname)) {
          const { history } = this.props;
          history.push('/');
        }
      }
      this.setState({
        loading: false
      })
    });
  }

  public render() {
    const { loading } = this.state;

    return (
      loading ?
        <div>loading</div> :
        <div>
          <Route exact={true} path='/' component={Login} />
          <Route exact={true} path='/register' component={Register} />
          <Route path='/app' component={NavBar} />
          <Route exact={true} path='/app/newsfeed' component={NewsFeed} />
          <Route exact={true} path='/app/profile' component={Profile} />
        </div >
    );
  }
}

export default App;
