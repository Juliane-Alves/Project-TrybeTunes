import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Header from '../components/Header';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userLog: '',
      loading: false,
      clickLoginButtonDisabled: true,
      redirectEnable: false,
    };
  }

  handleInputChange = ({ target: { value } }) => {
    const CARACTERS = 3;
    const habiliteButton = value.length >= CARACTERS;
    this.setState({
      userLog: value,
      clickLoginButtonDisabled: !habiliteButton,
    });
  }

  handleClick = () => {
    const { user } = this.state;
    this.setState({ loading: true });
    createUser({ name: user }).then(() => {
      this.setState({ loading: false, redirectEnable: true });
    });
  }

  render() {
    const { userLog, loading, clickLoginButtonDisabled, redirectEnable } = this.state;
    return (
      <div data-testid="page-login">
        <Header />
        <form>
          <label htmlFor="userLog">
            <input
              type="text"
              name="userLog"
              placeholder="Insira nome de usuário"
              data-testid="login-name-input"
              id="user"
              value={ userLog }
              onChange={ this.handleInputChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ clickLoginButtonDisabled }
          >
            Entrar
          </button>
          { /* operador ternario */ }
          { loading ? <p>Carregando...</p> : null }
          { redirectEnable ? <Redirect to="/search" /> : null}
        </form>
      </div>
    );
  }
}

export default Login;
