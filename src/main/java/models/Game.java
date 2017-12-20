package models;

import java.util.ArrayList;

public class Game {

    public java.lang.String gameMode = "normal";
    public Deck deck;
    public java.util.List<Column> columns = new ArrayList<>();
    public java.util.List<String> errors = new ArrayList<>(10);

    public Game() {
        deck = new Deck();
        columns.add(new Column(1));
        columns.add(new Column(2));
        columns.add(new Column(3));
        columns.add(new Column(4));
    }

    // non-default constructor for hard mode
    public Game(java.lang.String gameMode, Deck deck) {
        this.gameMode = gameMode;
        this.deck = deck;
        columns.add(new Column(1));
        columns.add(new Column(2));
        columns.add(new Column(3));
        columns.add(new Column(4));
    }

    public void dealFour() {
        ArrayList<Card> deal;
        if (deck.cards.size() == 0) {
            errors.add(0, "There are no more cards in the deck");
        } else {
            deal = deck.dealFour();
            for (int i = 0; i < deal.size(); i++) {
                Card c = deal.get(i);
                columns.get(i).cards.add(c);
            }
        }
    }

    public void clearErrors() {
        this.errors.clear();
    }

    //customDeal to setup game for testing purposes (i.e. shuffled cards are random and hard to test)
    public void customDeal(int c1, int c2, int c3, int c4) {
        columns.get(0).cards.add(deck.cards.get(c1));
        deck.cards.remove(c1);
        columns.get(1).cards.add(deck.cards.get(c2));
        deck.cards.remove(c2);
        columns.get(2).cards.add(deck.cards.get(c3));
        deck.cards.remove(c3);
        columns.get(3).cards.add(deck.cards.get(c4));
        deck.cards.remove(c4);
    }

    public void remove(int columnNumber) {
        clearErrors();
        if (!columnHasCards(columnNumber)) {
            errors.add(0, "Cannot remove card, column is empty.");
            return;
        }
        Card c = getTopCard(columnNumber);
        for (int i = 0; i < 4; i++) {
            if (i != columnNumber && columnHasCards(i)) {
                Card cmp = getTopCard(i);
                if (cmp.getSuit() == c.getSuit()) {
                    if (cmp.getValue() > c.getValue()) {
                        columns.get(columnNumber).cards.remove(columns.get(columnNumber).cards.size() - 1);
                        return;
                    }
                }
                if (cmp.getSuit() == Suit.Comodines) {
                    columns.get(columnNumber).cards.remove(columns.get(columnNumber).cards.size() - 1);
                    columns.get(i).cards.remove(columns.get(i).cards.size() - 1);
                    return;
                }
            }
        }
        errors.add(0, "Cannot remove card, no higher card of the same suit.");
    }

    private boolean columnHasCards(int columnNumber) {
        return this.columns.get(columnNumber).cards.size() > 0;
    }

    private Card getTopCard(int columnNumber) {
        return this.columns.get(columnNumber).cards.get(this.columns.get(columnNumber).cards.size() - 1);
    }


    public void move(int columnFrom, int columnTo) {
        clearErrors();
        Card cardToMove = getTopCard(columnFrom);
        if (!columnHasCards(columnTo)) {
            if (gameMode.equals("hard")) {
                if (cardToMove.value == 14 || deck.cards.size() == 48) {
                    this.removeCardFromCol(columnFrom);
                    this.addCardToCol(columnTo, cardToMove);
                } else {
                    errors.add("Can only move Ace cards in hard mode.");
                }
            } else {
                this.removeCardFromCol(columnFrom);
                this.addCardToCol(columnTo, cardToMove);
            }
        } else {
            errors.add("The column must be empty.");
        }
    }

    private void addCardToCol(int columnTo, Card cardToMove) {
        columns.get(columnTo).cards.add(cardToMove);
    }

    private void removeCardFromCol(int colFrom) {
        this.columns.get(colFrom).cards.remove(this.columns.get(colFrom).cards.size() - 1);
    }
}