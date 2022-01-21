import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusic from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      infoAlbum: '',
    };
  }

  componentDidMount() {
    this.handleApi();
  }

  handleApi = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ musicList: await getMusic(id) });
    this.setState((prevState) => ({
      infoAlbum: prevState.musicList[0],
      musicList: prevState.musicList.slice(1),
    }));
  };

  render() {
    const { infoAlbum, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="artist-name">{ infoAlbum.artistName }</h2>
          <h2 data-testid="album-name">{ infoAlbum.collectionName }</h2>
          <img src={ infoAlbum.artworkUrl100 } alt={ infoAlbum.collectionName } />
          { musicList.map((music, index) => (
            <MusicCard
              key={ index }
              trackName={ music.trackName }
              previwUrl={ music.previwUrl }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

// Obtive orientação que ajudou no desenvolvimento de Matheus alves e Nicole Calderari
