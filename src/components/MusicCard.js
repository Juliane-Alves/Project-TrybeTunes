import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      loading: false,
    };
  }

  componentDidMount() {
    this.retrieveFavorites();
  }

  componentWillUnmount() {
    this.setState = () => {};
  }

  retrieveFavorites = () => {
    const { trackId } = this.props;
    this.setState({
      loading: true,
    });
    getFavoriteSongs().then((favoriteSongs) => {
      this.setState({
        loading: false,
        isFavorite: favoriteSongs.some((music) => music.trackId === trackId),
      });
    });
  }

  onCheckboxChange = async () => {
    const { trackId } = this.props;
    this.setState((prevState) => ({
      isFavorite: !prevState.favorite,
      loading: !prevState.loading }));
    await addSong(trackId);
    this.setState((prevState) => ({ loading: !prevState.loading }));
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, isFavorite } = this.state;
    return (
      <section>
        { loading ? <p>Carregando...</p> : null }
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackName }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackName }
            checked={ isFavorite }
            onChange={ () => this.onCheckboxChange() }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;

// Obtive orientação que ajudou no desenvolvimento de Matheus alves e Nicole Calderari
