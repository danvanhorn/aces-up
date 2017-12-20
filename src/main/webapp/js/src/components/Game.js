import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardColumn from './CardColumn';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ace: this.props.deck['type'] === "spanish" ? 12 : 14,
            gameMode: this.props.gameMode,
            selectedColumn: false,
            mode: "deal"
        };
        // bind 'this' keyword to class functions
        this.handleColumnSelect = this.handleColumnSelect.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.handleGameOver = this.handleGameOver.bind(this);
    }


    handleColumnSelect(column, colLen) {
        let { selectedColumn, mode } = this.state;
        if (selectedColumn === false) {
            if (colLen > 0) {
                this.setState({ selectedColumn: column, mode: "remove" })
            } else {
                this.setState({ selectedColumn: column, mode: "move" })
            }
        } else if (mode === "remove") {
            if (selectedColumn === column) {
                this.props.remove(selectedColumn);
            } else {
                this.props.move(selectedColumn, column);
            }
            this.setState({ selectedColumn: false, mode: "deal" })
        } else if (mode === "move") {
            if (column !== selectedColumn) {
                this.props.move(column, selectedColumn);
                this.setState({ selectedColumn: false, mode: "deal" })
            }
        }
        this.handleGameOver();
    }

    handleClick() {
        const { mode } = this.state;
        if (mode === "deal") {
            this.props.deal();
        } else {
            this.setState({ selectedColumn: false, mode: "deal" })
        }
        this.handleGameOver();
    }

    handleGameOver() {
        let complete = false;
        let canRemove = false;
        let i = 0;
        const { deck, columns, handleGameOver } = this.props;
        if (deck.length === 0) {
            columns.forEach((column) => {
                if (column.cards.length === 1 && column.cards[0].value === this.props.deck_type) {
                    i++;
                }
            });
            if (i === 4) {
                handleGameOver(true, true);
            } else {
                columns.forEach((column, idx) => {
                    columns.forEach(col => {
                        if (column !== col) {
                            if (col.cards[col.cards.length - 1].suit
                                === column.cards[column.cards.length - 1].suit) {
                                canRemove = true;
                            }

                        }
                    })
                })
                if (canRemove) {
                    handleGameOver(false, false);
                } else {
                    handleGameOver(true, false);
                }
            }
        }
        this.setState({ loading: false });
    }

    handleDeal() {
        this.props.deal();
    }

    // calls expandHelp() when the question mark is clicked
    handleExpand() {
        this.props.expandHelp();
    }


    render() {
        const { deck, columns, expanded, error } = this.props;
        const { mode, loading } = this.state;
        let expand = {};
        let className = "fa fa-question";
        if (expanded) {
            expand.marginTop = '300px';
            className = "fa fa-times";
        }
        return (
            <div className="gameContainer" style={expand}>
                <div className="titleContainer">
                    <h2 style={{ color: 'white' }}>Aces Up</h2>
                    <span onClick={this.handleExpand} style={{ fontSize: '32px' }}
                        className={`${className} helpTextButton`} aria-hidden="true" />
                </div>
                <div className="cardContainer">
                    {columns.map((column, idx) => {
                        return (
                            <CardColumn
                                key={idx}
                                colNum={idx}
                                onColumnSelect={this.handleColumnSelect}
                                cards={column.cards}
                                selected={this.state.selectedColumn}
                            />
                        )
                    })}
                </div>
                <div className="controlsContainer">
                    <div className="controlText">
                        {this.state.selectedColumn === false ?
                            (error ? `${error} ` : "Select a card.") :
                            "Select again to remove or a column to move the card."}
                    </div>
                    <div className="buttonContainer" id="buttonContainer">
                        <button className={`btn-bar ${mode !== "deal" ? "warning" : ""}`} onClick={this.handleClick}>
                            {mode === "deal" ? "Deal" : "Cancel"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


const { arrayOf, shape, string, number } = PropTypes;

const card = {
    value: number,
    suit: string
};

const cards = {
    id: number,
    cards: arrayOf(shape(card))
}

const deck = {
    cards: arrayOf(card)
};

Game.propTypes = {
    gameMode: string,
    deck: shape(deck),
    columns: arrayOf(
        shape(cards),
        shape(cards),
        shape(cards),
        shape(cards)).isRequired
};

export default Game;
