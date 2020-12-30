import React, { Component } from 'react';

class Genre extends Component {
    state = { 
        isLoading: true,
        Genres : []
    }

    async componentDidMount() {
        const response = await fetch('/api/genres')
        const body = await response.json();
        this.setState({Genres :body, isLoading: false});
    }


    render() { 
        const {Genres, isLoading} = this.state;
        if(isLoading) 
            return ( 
                <div>
                    Loading...
                </div>
            );
        
        return(
            <div>
                <h2>Genres</h2>
                {
                    Genres.map( genre =>
                        <div id={genre.id}>
                            {
                                genre.name
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}
 
export default Genre;