// create.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitleName = this.onChangeTitleName.bind(this);
    this.onChangeContentName = this.onChangeContentName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      content: ''
    }
  }
  
  onChangeTitleName   = (e) =>  this.setState({title: e.target.value});
  onChangeContentName = (e) =>  this.setState({content: e.target.value});  

  onSubmit = async (e)=> {
    e.preventDefault();
  try{
    await axios.post('http://localhost:5000/notes/', 
    {
      title: this.state.title,
      content: this.state.content
    },
    {auth: {
      username: 'test', 
      password: 'test'
    }
    });
    this.setState({
			title : '',
			content : ''
		});
  }
  catch(error){
    this.setState({ response: error.message });
  }};
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Note</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Note Title:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.title}
                      onChange={this.onChangeTitleName}
                      />
                </div>
                <div className="form-group">
                    <label>Note Content: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.content}
                      onChange={this.onChangeContentName}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" value="Insert Note" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}