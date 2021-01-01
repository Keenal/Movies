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
    Table,
    FormGroup,
    Container,
    Label
  } from 'reactstrap';

class Movies extends Component {
    emptyItem = {
        id: '103',
        movieDate: new Date(),
        descript: '',
        personalNote: '',
        genres: [1, 'Thriller']
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isLoading: true,
            Genres: [],
            Movies: [],
            item: this.emptyItem
        }
    }

    

    async remove(id){
        await fetch(`/api/movies/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          }

        }).then(() => {
          let updatedMovies = [...this.state.Movies].filter(i => i.id !== id);
          this.setState({Movies : updatedMovies});
        });

    }

    async componentDidMount() {
        const response = await fetch('/api/genres');
        const body = await response.json();
        this.setState({Genres:body, isLoading: false})

        const responseMovies = await fetch('/api/movies');
        const bodyMovies = await responseMovies.json();
        this.setState({Movies:bodyMovies, isLoading: false})
    }

    render() { 
        const title= <h3 className="pt-5">Add Movie</h3>;
        const {Genres} = this.state;
        const {Movies, isLoading} = this.state;

        if(isLoading)
            return(<div>Loading...</div>)

    
        let optionList = 
            Genres.map( genre =>
                <option id={genre.id}>
                    {genre.name}
                </option>)

        let rows = 
            Movies.map(movie =>
                <tr>
                    <td>{movie.descript}</td>
                    <td>{movie.personalNote}</td>
                    <td>{movie.movieDate}</td>
                    <td>{movie.genre.name}</td>
                    <td><Button size="sm" color="danger" onClick = { () => this.remove(movie.id)}>Delete</Button></td>
                </tr>)

        return ( 
            <div>
                <AppNav/> 
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" id="title" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <select>
                                {optionList}
                            </select>
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
                <Container>
                    <h3>Movies List</h3>
                    <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Name</th>
                            <th width="40%">PersonalNote</th>
                            <th>Date</th>
                            <th>Genre</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                    </Table>
                </Container>
        </div>
        );
    }
}
 
export default Movies;