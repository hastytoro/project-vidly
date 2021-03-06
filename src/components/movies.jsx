import React, { Component } from 'react';
import Pagination from '../common/pagination';
import ListGroup from '../common/listGroup';
import MoviesTable from './moviesTable';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedItem: {},
  };

  componentDidMount = () => {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  };

  handleDelete = (movie) => {
    const filterMovies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: filterMovies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedItem: genre, currentPage: 1 });
    console.log(this.state.selectedItem);
  };

  render() {
    const { length: count } = this.state.movies;
    const { movies, genres, currentPage, pageSize, selectedItem } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered =
      selectedItem && selectedItem._id
        ? movies.filter((m) => m.genre._id === selectedItem._id)
        : movies;
    const newMovies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedItem}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h1>Movie Database</h1>
          <p>We currently have {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={newMovies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
