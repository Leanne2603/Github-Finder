import React, { Fragment, Component } from 'react'
import Navbar from './components/layout/Navbar'
import './App.css';
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'
import User from './components/users/User'


class App extends React.Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
  }

  componentDidMount () {
    this.setState({ loading: true})

    fetch(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then(response => response.json())
    .then(data => this.setState({users: data, loading: false}));
  }

  searchUsers = async (text) => {
    this.setState({ loading: true })
    fetch(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then(response => response.json())
    .then(data => this.setState({users: data.items, loading: false}));
  }

  // Get a single Github user
  getUser = async (login) => {
    this.setState({ loading: true })
    fetch(`https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    .then(response => response.json())
    .then(data => this.setState({user: data, loading: false}));
  }

  // Clears users from state
  clearUsers = () => this.setState({ users: [], loading: false})

  setAlert = (msg, type) => {
    this.setState({alert: { msg, type }})

    setTimeout(() => this.setState({alert: null}), 5000)
  }

  render() {
    const {users, user, loading} = this.state

    return (
      <Router>
      <div className="App">
        <Navbar />
        <Alert alert={this.state.alert} />
        <Switch>
          <Route exact path="/" 
          render={props => (
            <Fragment>
              <Search 
                searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers} 
                showClear={users.length > 0 ? true : false} 
                setAlert={this.setAlert} 
                />
              <Users loading={loading} users={users} />
            </Fragment>
          )} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" render ={props => (
            <User {...props} getUser={this.getUser} user={user} loading={loading} />
          )} />
        </Switch>
        <div className="container">
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
