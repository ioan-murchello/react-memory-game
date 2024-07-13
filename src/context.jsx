import { createContext, useState } from "react"; 

 

export const GameContext = createContext()

const initialState = {
  startGame: false,
  twoPlayers: false,
  level: 0,
  cardsMatched: 0,
  scores: { firstPlayer: 0, secondPlayer: 0 }, 
}; 
const GameContextProvider = ({children}) => {
    const [gameState, setGameState] = useState(initialState)
    const setStartGame = () => {
        setGameState(prev => {
            return {
              ...prev,
              startGame: true,
            };
        })
    }
    const exitGame = () => {
        setGameState(initialState)
    }
    const setGameForTwoPlayers = (flag) => {
        setGameState(prev => {
            return {
              ...prev,
              twoPlayers: flag,
            };
        })
    }
    const selectNumberOfCards = num => {
        setGameState(prev => {
            return {
                ...prev,
                level: num,
            }
        })
    }

    const incrementMatched = () => {
      setGameState(prev => {
        return { ...prev, cardsMatched : prev.cardsMatched + 1};
      })
    }

    const setScores = (player) => {
      setGameState(prev => {
        return {
          ...prev,
          scores: { ...prev.scores, [player]: prev.scores[player] + 1},
        };
      })
    }

    return (
      <GameContext.Provider
        value={{
          gameState,
          setStartGame,
          exitGame,
          setGameForTwoPlayers,
          selectNumberOfCards,
          incrementMatched,
          setGameState,
          setScores,
        }}
      >
        {children}
      </GameContext.Provider>
    );
}

export default GameContextProvider