import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
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

    async componentDidMount() {
      try{
      const UpdateNote = await axios.get('http://localhost:5000/notes/'+this.props.match.params.id,
      {auth: {
        username: 'test',
        password: 'test'
      }})
      const {title,content}=UpdateNote.data;
      this.setState({title,content});
      }
      catch(error){
          console.log(error);
          }
    }

  onChangeTitleName   = (e) => this.setState({title: e.target.value});
  onChangeContentName = (e) => this.setState({content: e.target.value});

  onSubmit = async (e)=> {
    e.preventDefault();
  try {
      const obj = await axios.put('http://localhost:5000/notes/'+this.props.match.params.id, 
      {
        title: this.state.title,
        content: this.state.content
      },
      {auth: {
        username: 'test',
        password: 'test'
      }});
      this.setState({response: obj.data });
      this.props.history.push('/index');
  }
  
  catch(err){
      this.setState({ response: err.message });
  }
};
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Note</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.title}
                      onChange={this.onChangeTitleName}
                      />
                </div>
                <div className="form-group">
                    <label>Content: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.content}
                      onChange={this.onChangeContentName}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Note" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}