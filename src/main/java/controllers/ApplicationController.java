/**
 * Copyright (C) 2013 the original author or authors.
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package controllers;

import models.Deck;
import models.Game;
import models.SpanishDeck;
import ninja.Context;
import ninja.Result;
import ninja.Results;

import com.google.inject.Singleton;
import ninja.params.PathParam;


@Singleton
public class ApplicationController {

    public Result index() {
        return Results.html().template("views/AcesUp/AcesUp.flt.html");
    }

    public Result gameGet(Context context, @PathParam("mode") String mode) {
        Deck d;

        if (mode.equals("spanish")) {
            d = new SpanishDeck();
        } else {
            d = new Deck();
        }
        
        //Parameter validation
        if (!(mode.equals("normal") || mode.equals("hard"))) {
            mode = "normal";
        }


        // we can add the spanish game mode here
        Game g = new Game(mode, d);
        g.deck.shuffle();
        g.dealFour();

        return Results.json().render(g);
    }

    public Result dealPost(Context context, Game g) {
        if (context.getRequestPath().contains("deal")) {
            g.dealFour();
        }
        return Results.json().render(g);
    }

    public Result removeCard(Context context, @PathParam("column") int colNumber, Game g) {
        g.remove(colNumber);
        return Results.json().render(g);
    }

    public Result moveCard(Context context, @PathParam("columnFrom") int colFrom, @PathParam("columnTo") int colTo, Game g) {
        g.move(colFrom, colTo);
        return Results.json().render(g);
    }

}
