import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Table,Container,Input,Button,Label, FormGroup, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class Expsenses extends Component {
 
    emptyItem = {
        descript : '' ,
        moviedate : new Date(),
        id:104,
        personalNote : '',
        genre : {id:1 , name:'Action'}
    }

    
    constructor(props){
      super(props)

      this.state = { 
        isLoading :false,
        Genres:[],
        Movies : [],
        date :new Date(),
        item : this.emptyItem
       }

       this.handleSubmit= this.handleSubmit.bind(this);
       this.handleChange= this.handleChange.bind(this);
       this.updateGenre = this.updateGenre.bind(this);
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


    handleChange(event){
      const target= event.target;
      const value= target.value;
      const name = target.name;
      let item={...this.state.item};
      item[name] = value;
      this.setState({item});
      console.log(item);
    }

    updateGenre(event) {
      this.setState({
        Genre :event.target.value
      });
      console.log(event.target.value);
    }


    handleDateChange(date){
      let item={...this.state.item};
      item.moviedate= date;
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
          let updatedmovies = [...this.state.Movies].filter(i => i.id !== id);
          this.setState({Movies : updatedmovies});
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
        const title =<h3>Add movie</h3>;
        const {Genres} =this.state;
        const {Movies,isLoading} = this.state;
        

        if (isLoading)
            return(<div>Loading....</div>)
        

            let optionList  =
            Genres.map( (genre) =>
                <option value={genre.id} key={genre.id}>
                            {genre.name} 
                </option>
            )
        
        let rows=
            Movies.map( movie =>
              <tr key={movie.id}>
                <td>{movie.descript}</td>
                <td>{movie.personalNote}</td>
                <td><Moment date={movie.moviedate} format="YYYY/MM/DD"/></td>
                <td>{movie.genre.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(movie.id)}>Delete</Button></td>

              </tr>


            )
        

        return (
            <div>
                <AppNav/>
                <Container>
                    {title}
                    
                    <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                            <Label for="descript">Title</Label>
                            <Input type="text" name="descript" id="descript" onChange={this.handleChange}/>
                    </FormGroup>


                    <FormGroup>
                            <Label for="genre">Genre</Label>
                            <select onChange={this.updateGenre}>
                                {optionList}
                            </select>
                    </FormGroup>

                    <FormGroup>
                            <Label for="city">Date</Label>
                            <DatePicker selected={this.state.item.moviedate} onChange={this.handleDateChange} />
                    </FormGroup>

                    <FormGroup>
                            <Label for="personalNote">Description</Label>
                            <Input type="textarea" name="personalNote" id="personalNote" onChange={this.handleChange}/>
                    </FormGroup>
                      
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/">Cancel</Button>
                    </FormGroup>

                    </Form>
                </Container>
              

              <Container>
                <h3>movie List</h3>
                <Table className="mt-4">
                <thead>
                  <tr>
                    <th width="20%">Name</th>
                    <th width="40%">Description</th>
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
 
export default Expsenses;