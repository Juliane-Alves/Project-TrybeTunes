import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      loadingEvent: false,
    };
  }

  onCheckboxChange = async () => {
    const { trackId } = this.props;
    this.setState((prevState) => ({
      isFavorite: !prevState.favorite,
      loadingEvent: !prevState.loadingEvent }));
    await addSong(trackId);
    this.setState((prevState) => ({ loadingEvent: !prevState.loadingEvent }));
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loadingEvent, isFavorite } = this.state;
    return (
      <section>
        { loadingEvent ? <p>Carregando...</p> : null }
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
            onChange={ () => this.onCheckboxChange() } // Como a mudança é dinamica foi usado arrow funcion assim como ensinado na aula do prof Moisés.
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
