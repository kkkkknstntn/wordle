export interface GameState {
    currentRow: number;
    result?: any; // Здесь мы используем any, так как точный тип зависит от бэкенда
    attemptsLeft: number;
}