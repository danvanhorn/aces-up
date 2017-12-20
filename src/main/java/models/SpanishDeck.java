package models;

public class SpanishDeck extends Deck {
    public SpanishDeck() {
        this.cards.clear();
        for(int i = 1; i <= 12; i++){
            cards.add(new Card(i,Suit.Bastos));
            cards.add(new Card(i,Suit.Oros));
            cards.add(new Card(i,Suit.Copas));
            cards.add(new Card(i,Suit.Espadas));
        }
        cards.add(new Card(13, Suit.Comodines));
        cards.add(new Card(13, Suit.Comodines));
    }
}
