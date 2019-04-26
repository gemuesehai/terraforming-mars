
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class DesignedMicroOrganisms implements IProjectCard {
    public cost: number = 16;
    public tags: Array<Tags> = [Tags.SCIENCE, Tags.MICROBES];
    public name: string = "Designed Micro-organisms";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "It must be -14C or colder. Increase your plant production 2 steps";
    public description: string = "Specializing in extremely cold conditions";
    public canPlay(_player: Player, game: Game): boolean {
        return game.getTemperature() <= -14;
    }
    public play(player: Player, game: Game) {
        if (game.getTemperature() > -14) {
            throw "It must be -14C or colder";
        }
        player.plantProduction += 2;
        return undefined;
    }
}
