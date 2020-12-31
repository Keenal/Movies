import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    FormGroup,
    Container,
    Label
  } from 'reactstrap';

class Movies extends Component {
    state = {  }
    render() { 
        const title= <h3>Add Movie</h3>
        return ( 
            <div>
            <AppNav/> 
            <Container>
                {title}
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="genre">Genre</Label>
                        <Input type="text" name="genre" id="genre" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="movieDate">Movie Date</Label>
                        <DatePicker selected={this.state.date} onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input type="textarea" name="text" id="exampleText" />
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/genres">Cancel</Button>
                    </FormGroup>



                </Form>
            </Container>
        </div>
        );
    }
}
 
export default Movies;