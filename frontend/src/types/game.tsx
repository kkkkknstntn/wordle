import { IUser } from "./user";

export interface GameState { // Данные игры с сервера
    game_id: number;
    guessed_word: string;
    current_try: number;
    game_status: string;
    letter_statuses: string[];
}

export interface NewAttempt {
    game_id: number; // Используем IUser как тип для currentUser
    guessed_word: string;
}

export interface GameDataById {
  id: number,
  word: string,
  userId: IUser | null,
  user: number | null,
  gameStatus: string,
  currentTry: number
}

export interface GameStateAndGameDataById {
    gameState: GameState,
    gameDataById: GameDataById
}