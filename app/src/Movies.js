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
    state = { 
        date: new Date(),
        isLoading: true,
        movies: [],
        Genres: []
    }

    async componentDidMount() {
        const response = await fetch('/api/genres');
        const body = await response.json();
        
        this.setState({Genres:body, isLoading: false})
    }

    render() { 
        const title= <h3 className="pt-5">Add Movie</h3>;
        const {Genres, isLoading} = this.state;

        if(isLoading)
            return(<div>Loading...</div>)

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
                            {
                                Genres.map( genre =>
                                    <div id={genre.id}>
                                        {genre.name}
                                    </div>)
                            }
                            <Input type="text" name="genre" id="genre" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="movieDate">Date</Label>
                            <DatePicker selected={this.state.date} onChange={this.handleDateChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>
                            <Button color="secondary" tag={Link} to="/" >Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
        </div>
        );
    }
}
 
export default Movies;