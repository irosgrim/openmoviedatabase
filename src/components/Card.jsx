import React, { Component } from 'react';

class Card extends Component {
	constructor(props) {
		super(props);

		this.fetchData = this.fetchData.bind(this);
		this.state = {
			movieData: {}
		};
	}

	fetchData() {
		const api_key = process.env.REACT_APP_API_KEY;
		fetch(`https://www.omdbapi.com/?i=${this.props.movie}&apikey=${api_key}`)
			.then(response => {
				return response.json();
			})
			.then(response => {
				this.setState({ movieData: response });
			})
			.catch(error => {
				console.log(error);
			});
	}
	componentDidMount() {
		this.fetchData();
	}
	render() {
		const {
			Title,
			Released,
			Director,
			Actors,
			Plot,
			Poster,
			imdbRating
		} = this.state.movieData;

		if (!Poster || Poster === 'N/A') {
			return null;
		}
		return (
			<div className="card">
				<figure>
					<img src={Poster} alt={Title} />
				</figure>
				<article>
					<header>
						<h2>{Title}</h2>
						<h3>
							Directed by: <span className="black">{Director}</span>
						</h3>
						<h3>
							Actors: <span className="black">{Actors}</span>
						</h3>
						<h3>
							Release date: <span className="black">{Released}</span>
						</h3>
					</header>
					<p>{Plot}</p>
					<section className="rating-section">
						<div className="site"> IMDB rating:</div>
						<div className="rating-container">
							<div className="rating">
								<div
									className="rating-percent"
									style={{ width: `${imdbRating * 10}%` }}
								/>
							</div>
							<p className="rating-label">{imdbRating} / 10</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
}
export default Card;
