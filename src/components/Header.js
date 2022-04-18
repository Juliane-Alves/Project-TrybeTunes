import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userLog: '',
    };
  }

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        userLog: user.name,
      });
    });
  }

  render() {
    const { userLog } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          {userLog ? <span data-testid="header-user-name">{ userLog }</span>
            : (<p>Carregando...</p>)}
        </div>
        <div>
          <nav>
            <Link
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile

            </Link>
          </nav>
        </div>
      </header>
    );
  }
}
// Obtive orientação que ajudou no desenvolvimento de Matheus alves e Nicole Calderari
// commit de alteração
export default Header;
