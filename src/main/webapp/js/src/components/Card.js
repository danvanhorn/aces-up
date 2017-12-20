import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

class Card extends Component {

    getDeckType(){
        const {suit} = this.props;
        const spn_suits = ['Bastos', 'Oros', 'Copas', 'Espadas', 'Comodines'];
        if(spn_suits.indexOf(suit) > -1){
            return "spanish"
        }
        return "standard"
    }

    getValue(val) {

        const std_face = ['J', 'Q', 'K', 'A'];
        const spn_face = ['J', 'Q', 'K', ''];

        if (this.getDeckType() === "spanish") {
            return val < 10 ? val : spn_face[val - 10];
        } else {
            return val < 11 ? val : std_face[val - 11];
        }
    }

    loadSuitSvg(suit) {
        return (<SVG
            src={`/assets/svg/${suit}.svg`}
            preload={<div className="loader">loading</div>}
            onLoad={src => {}}>
        </SVG>)
    }

    render() {
        const {value, suit, top, focused} = this.props;
        let card = null;
        // set the color to black or red based on the suit

        let className = "card";
        if (top) {
            className += " top";
        }
        if (focused) {
            className += " focused";
        }
        if (suit === "Hearts" || suit === "Diamonds" || suit === "Espadas" || suit === "Bastos" || suit === "Commodines") {
            className += " red";
        } else {
            className += " black";
        }
        if (top) {
            card = (
                <div className={className}>
                    <div className="cardText">
                        {`${this.getValue(value)}`}
                        {this.loadSuitSvg(suit)}
                    </div>
                    <div className="emblem">
                        {this.loadSuitSvg(suit)}
                    </div>
                    <div className="cardText invert left">
                        {`${this.getValue(value)}`}
                        {this.loadSuitSvg(suit)}
                    </div>
                </div>);
        } else {
            card = (
                <div className={className}>
                    <div className="cardText">
                        {`${this.getValue(value)}`}
                        {this.loadSuitSvg(suit)}
                    </div>
                </div>
            );
        }

        return card;

    }
}

const {shape, string, number} = PropTypes;

const card = {
    value: number,
    suit: string
}

Card.propTypes = {
    cars: shape(card),
}

export default Card;