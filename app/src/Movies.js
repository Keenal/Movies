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

  import Moment from 'react-moment';

class Movies extends Component {
    emptyItem = {
        id: '104',
        movieDate: new Date(),
        descript: '',
        personalNote: '',
        genre: [1, 'Thriller']
    }

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            isLoading: false,
            Genres: [],
            Movies: [],
            item: this.emptyItem
        }

        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleDateChange= this.handleDateChange.bind(this);
    }

    async handleSubmit(event){
     
        const item = this.state.item;
      
  
        await fetch(`/api/movies`, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(item),
        });
        
        event.preventDefault();
        this.props.history.push("/movies");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
        console.log(this.state);
    }

    handleDateChange(date) {
        let item = {...this.state.item};
        item.movieDate = date;
        this.setState({item});
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
        const response= await fetch('/api/genres');
        const body= await response.json();
        this.setState({Genres : body , isLoading :false});


        const responseMov= await fetch('/api/movies');
        const bodyMov = await responseMov.json();
        this.setState({Movies : bodyMov , isLoading :false});
        console.log(bodyMov);

    }

    render() { 
        const title= <h3 className="pt-5">Add Movie</h3>;
        const {Genres} = this.state;
        const {Movies, isLoading} = this.state;

        if(isLoading)
            return(<div>Loading...</div>)

    
        let optionList = 
            Genres.map( (genre) =>
                <option value={genre.id} key={genre.id}> 
                            {genre.name}
                </option>
                )

        let rows = 
            Movies.map(movie =>
                <tr key={movie.id}>
                    <td>{movie.descript}</td>
                    <td>{movie.personalNote}</td>
                    <td><Moment date= {movie.movieDate} format="YYYY/MM/DD"/></td>
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
                            <select name="genre" onChange={this.handleChange}>
                                {optionList}
                            </select>
                        </FormGroup>

                        <FormGroup>
                            <Label for="movieDate">Date</Label>
                            <DatePicker selected={this.state.item.movieDate} onChange={this.handleDateChange} />
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