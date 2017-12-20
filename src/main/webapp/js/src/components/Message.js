import React, { Component } from 'react';


class Message extends Component {

    render() {
        const { gameMode } = this.props;
        let expand = {}

        if (this.props.expanded) {
            expand.top = '0'
        }

        let moveRule = (<p>You are able to move any card to any column, provided that column does not have any other cards in it.</p>);
        if (gameMode === "hard") {
            moveRule = (<p>You are only able to move Ace cards, on every draw but the first, to any other column if that column has no cards in it.</p>);
        } else if (gameMode === "spanish") {
            moveRule = (
                <p>You are able to move any card to any column, provided that column does not have any other cards in it
                    Comodines are wild cards which act as the highest value card, so you may remove any card from a stack. If you
                    do the comodin card will be removed.
                </p>);
        }

        return (
            <div className="helpMessage" style={expand}>
                <h1> How to play Aces Up Solitaire</h1>
                <p>The objective of the game is to remove all cards from the columns other than the aces, and to have the aces be the last remaining cards.</p>
                <p>A card may only be removed if the following conditions are met:</p>
                <ol>
                    <li>There are two of that card's suit on the most recent row in that column.</li>
                    <li>Only if that card is lower in its value than the other card.</li>
                </ol>
                {moveRule}
            </div>)
    }
}

export default Message;