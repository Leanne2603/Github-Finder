import React from 'react'
import Navbar from './components/layout/Navbar'
import './App.css';
import Users from './components/users/Users'


class App extends React.Component {
  state = {
    users: [],
    loading: false
  }

  componentDidMount () {
    this.setState({ loading: true})

    fetch('https://api.github.com/users')
    .then(response => response.json())
    .then(data => this.setState({users: data, loading: false}));
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
