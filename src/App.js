import React, { Component } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import './components/App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.state = {
			searchResult: []
		};
	}
	handleSearch(e) {
		this.setState({
			searchResult: e
		});
	}
	render() {
		return (
			<div className="App">
				<Search
					handlesearch={this.handleSearch}
					searchresult={this.state.searchResult.length}
				/>
				<Results searchresult={this.state.searchResult} />
			</div>
		);
	}
}

export default App;
