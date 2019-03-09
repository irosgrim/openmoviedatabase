import React, { Component } from 'react';
import Card from './Card';

class Results extends Component {
	render() {
		return (
			<div className="results-component">
				{this.props.searchresult.map((movie, index) => {
					return <Card movie={movie} key={movie + `_` + index} />;
				})}
			</div>
		);
	}
}
export default Results;
