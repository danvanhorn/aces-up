import React, {Component} from 'react';
import Game from './Game'
import GameSelect from './GameSelect';
import Message from './Message';
import PropTypes from 'prop-types';
import path from 'path';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameMode: null,
            deck: null,
            columns: null,
            expanded: false,
            error: null,
            gameOver: false,
            gameWin: false
        };
        // bind 'this' keyword to the functions in this class
        this.deal = this.deal.bind(this);
        this.remove = this.remove.bind(this);
        this.move = this.move.bind(this);
        this.expandHelpText = this.expandHelpText.bind(this);
        this.getGame = this.getGame.bind(this);
        this.handleGameOver = this.handleGameOver.bind(this);
    }

    // makes a request to our server with a url and request options
    // resolves the returned Promise
    callApi({url, options}) {
        this.props.get({url, options})
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.setState({
                    deck: json.deck,
                    columns: json.columns === undefined || json.columns === null ? null : json.columns,
                    error: json.errors ? json.errors[0] : null
                });
            })
            .catch(error => console.error(error));
    }

    // call this function when the game inits to
    // get the initial game object
    getGame({gameMode, gameOver, gameWin, deck_type}) {
        this.setState({
            gameMode: gameMode ? gameMode : "normal",
            gameOver,
            gameWin
        });
        this.callApi({
            url: `/game/${gameMode}`,
            options: {
                method: 'GET',
                mode: 'cors'
            }
        });
    }

    // call the server to deal four cards from the deck
    deal() {
        this.callApi({
            url: '/dealGame',
            options: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                body: JSON.stringify({
                    deck: this.state.deck,
                    columns: this.state.columns,
                    gameMode: this.state.gameMode
                })
            }
        });
    }

    // call the server to remove a card from the column
    // this is validated server side, not the best but it works reliably
    remove(colNumber) {
        this.callApi({
            url: path.join("/removeCard/" + colNumber),
            options: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                body: JSON.stringify({
                    deck: this.state.deck,
                    columns: this.state.columns,
                    gameMode: this.state.gameMode
                })
            }
        })
    }

    // call the server to move a card from one column to another
    // this is validated server side, not the best but it works reliably
    move(fromCol, toCol) {
        let url = "moveCard";
        this.callApi({
            url: path.join("/" + url + "/" + fromCol + "/" + toCol),
            options: {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                mode: 'cors',
                body: JSON.stringify({
                    deck: this.state.deck,
                    columns: this.state.columns,
                    gameMode: this.state.gameMode
                })
            }
        })
    }


    handleGameOver(gameOver, gameWin) {
        this.setState({
            gameOver,
            gameWin
        });
    }


    // function to set the expanded state, which sets the visibility of the
    // <Message/> component
    expandHelpText() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const {deck, columns, expanded, error, gameMode, gameOver} = this.state
        // while the async call is resolving
        let gameContent = (<div className="loader">loading</div>);
        // if we have both a deck and an initialized state
        if (this.state && deck && !gameOver) {
            gameContent =
                (<Game
                    deck={deck.cards}
                    columns={columns}
                    deal={this.deal}
                    remove={this.remove}
                    move={this.move}
                    expandHelp={this.expandHelpText}
                    expanded={expanded}
                    error={error}
                    handleGameOver={this.handleGameOver}
                />)
        }

        return (
            <div className="outerWrapper">
                <GameSelect
                    onDifficultySelect={this.getGame}
                    gameOver={this.state.gameOver}
                    gameWin={this.state.gameWin}
                />
                <div className="appContainer">
                    <Message expanded={this.state.expanded} gameMode={this.state.gameMode}/>
                    {gameContent}
                </div>
            </div>
        );
    }
}

// require the window.fetch wrapper as a dependency
const {func} = PropTypes;
App.PropTypes = {
    get: func.isRequired
}

export default App;
