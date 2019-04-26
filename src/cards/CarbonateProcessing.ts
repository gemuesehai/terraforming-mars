
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class CarbonateProcessing implements IProjectCard {
    public cost: number = 6;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Carbonate Processing";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Decrease your energy production 1 step and increase your heat production 3 steps.";
    public description: string = "Common minerals can be converted into carbon dioxide that increases the greenhouse effect.";
    public canPlay(player: Player): boolean {
        return player.energyProduction >= 1;
    }
    public play(player: Player, _game: Game) {
        if (player.energyProduction < 1) {
            throw "Must have energy production";
        }
        player.energyProduction--;
        player.heatProduction += 3;
        return undefined;
    }
}
