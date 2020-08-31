// index.component.js

import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {notes: []};
    }
    async componentDidMount(){
        try{
          var NotesData = await axios.get('http://localhost:5000/notes',
          {auth: {
            username: 'test',
            password: 'test'
          }});
          this.setState({notes: NotesData.data})
        }
        catch(error){
          console.error();
        }

    }

    tabRow(){
          return this.state.notes.map((object, i) => {
            console.log(object,i);
            return <TableRow obj={object} key={i} indice={i} delete ={ (ind) => this.deleteItem(ind)} />;
      });
    }

    deleteItem(index){
      this.setState({notes : this.state.notes.filter((_,i) => i !== index)});
    }

    render() {
      return (
        <div>
          <h3 align="center">Notes List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }