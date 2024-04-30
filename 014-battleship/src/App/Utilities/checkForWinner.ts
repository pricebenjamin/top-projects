import { Player } from "App/Interfaces";

export function checkForWinner(player: Player, computer: Player) {
  const playerHasShips = player.squares.includes("occupiedByDeployedShip");
  const computerHasShips = computer.squares.includes("occupiedByDeployedShip");

  if (!playerHasShips) return "computer";
  if (!computerHasShips) return "player";
  return null;
}
