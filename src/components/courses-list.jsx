import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';
import Course from './course';
// import dotenv from 'dotenv';

// const path = require('path');



// const SPACE_ID = process.env.SPACE_ID;
// console.log(SPACE_ID);
// const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const client = contentful.createClient({
  space: '9877q39gbu1b',
  accessToken: '05df4471456351fa9c90c1b4dab6927e7e9d400b160614b27c9270b7f85f38ed',
});

class CoursesList extends Component {
  state = {
    courses: [],
    searchString: '',
  };

  constructor() {
    super();
    this.getCourses();
  }

  getCourses = () => {
    client.getEntries({
      content_type: 'course',
      query: this.state.searchString,
    })
      .then((response) => {
        this.setState({ courses: response.items });
        console.log(this.state.courses);
      })
      .catch((error) => {
        console.log('Error occurred while fetching Entries');
        console.log(error);
      });
  };

  onSearchInputChange = (event) => {
    console.log('Search changed ...' + event.target.value);
    if (event.target.value) {
      this.setState({ searchString: event.target.value });
    } else {
      this.setState({ searchString: '' });
    }
    this.getCourses();
  };

  render() {
    return (
      <div>
        { this.state.courses ? (
          <div>
            <TextField
              style={{ padding: 24 }}
              id="searchInput"
              placeholder="Search for Courses"
              margin="normal"
              onChange={this.onSearchInputChange}
            />
            <Grid container spacing={24} style={{ padding: 24 }}>
              { this.state.courses.map(currentCourse => (
                <Grid item xs={12} sm={6} lg={4} x1={3} key={this.state.id}>
                  <Course course={currentCourse} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : 'No courses found' }
      </div>
    );
  }
}

export default CoursesList;
