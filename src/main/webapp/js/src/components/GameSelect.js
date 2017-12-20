import React, {Component} from 'react';

class GameSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(gameMode) {
        const {onDifficultySelect, gameOver, gameWin} = this.props;
        this.setState({started: true});

        if (gameOver) {
            onDifficultySelect({
                gameMode: gameMode || "normal",
                gameOver: false,
                gameWin: false
            });
        } else {
            onDifficultySelect({
                gameMode: gameMode || "normal",
                gameOver,
                gameWin
            });
        }
    }

    render() {

        const {gameOver, gameWin} = this.props;
        let subText = null;
        if (gameOver) {
            if (gameWin) {
                subText = (<h2> You won! <br/> Play again? </h2>);
            }
            else {
                subText = (<h2> You lost! <br/> Play again? </h2>);
            }
        }

        const {started} = this.state;
        const content = (
            <div className="gameSelect">
                <h1>Aces Up Solitaire</h1>
                {subText}
                <div className="buttonContainer">
                    <div className="gameSelectText">Select a Game Mode</div>
                    <button className="btn-bar primary" onClick={() => this.handleClick("normal")}>Normal</button>
                    <button className="btn-bar warning" onClick={() => this.handleClick("hard")}>Hard</button>
                    <button className="btn-bar spanish" onClick={() => this.handleClick("spanish")}>Spanish Deck</button>
                </div>
            </div>
        );

        return (started && !gameOver) ? null : content;
    }
}

export default GameSelect;
