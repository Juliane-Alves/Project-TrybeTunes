import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchArtBand: '',
      loading: false,
      returnBand: [],
      returnAlbum: true,
      artName: '',
      searchButtonDisabled: true,
    };
  }

  handleInputChange = ({ target: { value } }) => {
    const CARACTERS_MIN = 2;
    this.setState({
      searchArtBand: value,
      searchButtonDisabled: value.length < CARACTERS_MIN,
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    const { searchArtBand } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(searchArtBand).then((artist) => {
      this.setState({
        artName: searchArtBand,
        searchArtBand: '',
        loading: false,
        returnBand: artist,
        returnAlbum: artist.length > 0,
      });
    });
  }

  render() {
    const { searchArtBand,
      searchButtonDisabled,
      loading,
      returnBand,
      returnAlbum,
      artName } = this.state;

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
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.handleClick }
            disabled={ searchButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
        { loading ? <p>Carregando...</p> : null }
        <div>
          { artName && `Resultado de álbuns de: ${artName}` }
          { returnAlbum ? (returnBand.map((artist) => (
            <Link
              key={ artist.collectionId }
              data-testid={ `link-to-album-${artist.collectionId}` }
              to={ `/album/${artist.collectionId}` }
            >
              <div>
                { artist.collectionName }
              </div>
            </Link>
          ))) : <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}

export default Search;

// Obtive orientação que ajudou no desenvolvimento de Matheus alves e Nicole Calderari
