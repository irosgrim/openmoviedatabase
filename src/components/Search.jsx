import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movieList: ['tt0076759'],
			searchMovie: ''
		};
		this.handleSearch = this.handleSearch.bind(this);
		this.fetchData = this.fetchData.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	fetchData() {
		const api_key = process.env.REACT_APP_API_KEY;
		fetch(
			`https://www.omdbapi.com/?apikey=${api_key}&s=${
				this.state.searchMovie
			}&plot=full`
		)
			.then(response => {
				return response.json();
			})
			.then(response => {
				if (!response.Search) {
					this.setState({ moviesList: [] });
					return;
				}
				const foundMovies = response.Search.map(movie => movie.imdbID);
				this.setState({
					movieList: foundMovies
				});

				this.props.handlesearch(this.state.movieList);
			})
			.catch(error => {
				console.log('Could not fetch data: ', error);
			});
	}

	handleSearch(event) {
		event.preventDefault();
		this.fetchData();
	}

	handleChange(event) {
		this.setState({
			searchMovie: event.target.value
		});
	}
	render() {
		return (
			<div className="search-component">
				<h1>
					The <span className="black">O</span>pen{' '}
					<span className="black">M</span>ovie <span className="black">D</span>
					atabase
				</h1>
				<form onSubmit={this.handleSearch}>
					<input
						type="text"
						onChange={this.handleChange}
						placeHolder="search movie"
					/>
					<button>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
							<path
								fill="#AAA"
								fillRule="evenodd"
								d="M31.562 27.688c.292.291.438.645.438 1.062 0 .417-.146.77-.438 1.062l-1.75 1.75A1.447 1.447 0 0 1 28.75 32c-.417 0-.77-.146-1.063-.438l-6.25-6.25A1.447 1.447 0 0 1 21 24.25v-1C18.667 25.083 16 26 13 26c-2.375 0-4.552-.583-6.531-1.75a13.134 13.134 0 0 1-4.719-4.719C.583 17.552 0 15.375 0 13s.583-4.552 1.75-6.531A13.134 13.134 0 0 1 6.469 1.75C8.448.583 10.625 0 13 0s4.552.583 6.531 1.75A13.134 13.134 0 0 1 24.25 6.47C25.417 8.448 26 10.625 26 13c0 3-.917 5.667-2.75 8h1c.417 0 .77.146 1.062.438l6.25 6.25zM13 21a7.932 7.932 0 0 0 4.031-1.062 7.783 7.783 0 0 0 2.906-2.907A7.932 7.932 0 0 0 21 13a7.932 7.932 0 0 0-1.063-4.031 7.783 7.783 0 0 0-2.906-2.906A7.932 7.932 0 0 0 13 5a7.932 7.932 0 0 0-4.031 1.063 7.783 7.783 0 0 0-2.907 2.906A7.932 7.932 0 0 0 5 13c0 1.458.354 2.802 1.062 4.031a7.783 7.783 0 0 0 2.907 2.907A7.932 7.932 0 0 0 13 21z"
							/>
						</svg>
					</button>
				</form>
			</div>
		);
	}
}

export default Search;
