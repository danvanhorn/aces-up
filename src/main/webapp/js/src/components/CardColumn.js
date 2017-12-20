import React, { Component } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

class CardColumn extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { colNum , cards } = this.props;
    this.props.onColumnSelect(colNum, cards.length);
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="column" onClick={this.handleClick}>
        {
          cards.map((card, idx) => {
            let top, focused = false;
            if(cards.length - 1 === idx){
              top = true;
            }
            if(this.props.selected === this.props.colNum){
              focused = true;
            }

            return (
              <Card key={idx} top={top} focused={focused} {...card} />
            );
          })
        }
      </div>
    )
  }
}

const { arrayOf, shape, string, number } = PropTypes;

const card = {
  value: number,
  suit: string
}

CardColumn.propTypes = {
  cards: arrayOf(shape(card)),
}

export default CardColumn;