// статистика игрока
export interface Player {
    id: number;
    name: string;
    winRate: number;
    wins: number;
    losses: number;
}

// условие для генерации топа из игроков (по винрейту или по победам)
export interface TopType {
    type: 'winrate' | 'wins';
}