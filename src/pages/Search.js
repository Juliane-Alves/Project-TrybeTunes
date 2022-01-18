import React from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtBand: '',
      searchButtonDisabled: true,
    };
  }

  handleInputChange = ({ target: { value } }) => {
    const CARACTERS_MIN = 2;
    const habiliteSearchButton = value.length >= CARACTERS_MIN;
    this.setState({
      searchArtBand: value,
      searchButtonDisabled: !habiliteSearchButton,
    });
  }

  render() {
    const { searchArtBand, searchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtBand">
            <input
              type="text"
              name="searchArtBand"
              placeholder="Insira nome da banda ou artista"
              data-testid="search-artist-input"
              id="user"
              value={ searchArtBand }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ searchButtonDisabled }
          >
            Pesquisar
          </button>
          { /* operador ternario */ }
          { /* loading ? <p>Carregando...</p> : null */ }
          { /* redirectEnable ? <Redirect to="/search" /> : null */ }
        </form>
      </div>
    );
  }
}

export default Search;
