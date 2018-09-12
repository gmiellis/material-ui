import React, { Component } from 'react';
import NavBar from './components/navbar';
import CoursesList from './components/courses-list';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CoursesList />
      </div>
    )
  }
}


export default App;
