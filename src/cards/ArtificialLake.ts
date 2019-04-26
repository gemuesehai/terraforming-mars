
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectSpace } from "../inputs/SelectSpace";
import { ISpace } from "../ISpace";
import { SpaceType } from "../SpaceType";

export class ArtificialLake implements IProjectCard {
    public cost: number = 15;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Artificial Lake";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Requires -6C or warmer. Place 1 ocean tile on an area not reserved for ocean. Gain 1 victory point.";
    public description: string = "Landscaping is as natural as terraforming.";
    public canPlay(_player: Player, game: Game): boolean {
        return game.getTemperature() >= -6;
    }
    public play(player: Player, game: Game) {
        if (game.getTemperature() < -6) {
            throw "Requires -6C or warmer";
        }
        player.victoryPoints++;
        return new SelectSpace(this.name, "Select a land space to place an ocean", game.getAvailableSpacesOnLand(player), (foundSpace: ISpace) => {
            game.addOceanTile(player, foundSpace.id, SpaceType.LAND);
            return undefined;
        });
    }
}
