interface gameData { // Данные игры с сервера
    game_id: number;
    guessed_word: string;
    current_try: number;
    game_status: string;
    letter_statuses: string[];
}

export interface responseData { // данные игры обёрнутые в response 
    data: gameData;
}