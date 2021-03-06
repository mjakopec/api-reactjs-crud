// TableRow.js

import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete = async (e)=> {
      e.preventDefault();
    try {
        await axios.delete('http://localhost:5000/notes/'+this.props.obj._id,{
          auth: {
          username: 'test',
          password: 'test'
        }})
        this.props.delete(this.props.indice);
        console.log('Deleted');
    }
    catch(error){
      console.log({response:error.message});
    }
  }

    render() {
    return (
        <tr>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.content}
          </td>
          <td>
          <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
          <button onClick={this.delete}  className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;