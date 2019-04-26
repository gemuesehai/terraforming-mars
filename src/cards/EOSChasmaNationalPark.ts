
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectCard } from "../inputs/SelectCard";

export class EOSChasmaNationalPark implements IProjectCard {
    public cost: number = 16;
    public tags: Array<Tags> = [Tags.PLANT, Tags.STEEL];
    public name: string = "EOS Chasma National Park";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Requires -12C or warmer. Add 1 animal to any card. Gain 3 plants. Increase your mega credit production 2 steps. Gain 1 victory point.";
    public description: string = "A wonder of the world, doing wonders for the tourism business.";
    public canPlay(_player: Player, game: Game): boolean {
        return game.getTemperature() >= -12;
    }
    public play(player: Player, game: Game) {
        if (game.getTemperature() < -12) {
            throw "Requires -12C or warmer";
        }
        const availableCards = game.getPlayedCardsWithAnimals();
        return new SelectCard(this.name, "Select card to add animal", availableCards, (foundCards: Array<IProjectCard>) => {
            foundCards[0]!.animals!++;
            player.plants += 3;
            player.megaCreditProduction += 2;
            player.victoryPoints++;
            return undefined;
        });
    }
}
