import { useContext, useState } from 'react';
import { GameContext } from '../context';
import { TfiReload } from 'react-icons/tfi';
import { RxExit } from 'react-icons/rx'; 
import cat from '../images/caty.svg';
import catAndDog from '../images/butterfly.svg';
import 'animate.css';

const GameOver = ({ shuffleAndResetCards, setShowModal }) => {
  const {
    setGameState,
    setStartGame,
    exitGame,
    gameState: { scores, twoPlayers },
  } = useContext(GameContext);

  const [switcher, setSwitcher] = useState(false);

  const handleRestart = () => {
    setSwitcher(true);
    setTimeout(() => {
      setShowModal(false);
      setSwitcher(false);
    }, 500);
    shuffleAndResetCards();
    setGameState((prev) => {
      return {
        ...prev,
        cardsMatched: 0,
        startGame: false,
        scores: { firstPlayer: 0, secondPlayer: 0 },
      };
    });
    setStartGame();
  };

  const more = scores.firstPlayer > scores.secondPlayer;

  const equal = scores.firstPlayer === scores.secondPlayer;

  return (
    <div className='game-over '>
      <div
        className={`info animate__animated animate__bounceIn ${
          switcher ? 'animate__bounceOutUp' : ''
        } `}
      >
        {twoPlayers ? (
          <div>
            {equal ? (
              <div className='scores-info'>
                <img
                  
                  src={cat}
                  alt='image'
                />
                <h2>Scores are equal</h2>
                {/* <FaHandshake /> */}
                <p>
                  FirstPlayer: {scores.firstPlayer}, SecondPlayer:{' '}
                  {scores.secondPlayer}
                </p>
              </div>
            ) : (
              <div>
                <h2>{more ? 'Player 1' : 'Player 2'} Won!</h2>
                <p>Score: {more ? scores.firstPlayer : scores.secondPlayer}</p>
              </div>
            )}
          </div>
        ) : (
          <div className='single-player'>
            <img 
              src={cat}
              alt='cat'
            />
            <h2 style={{ textAlign: 'center' }}>Complete</h2>
          </div>
        )}

        <div className='action-btns '>
          <button onClick={exitGame}>
            <RxExit />
          </button>
          <button onClick={handleRestart}>
            <TfiReload />
          </button>
        </div>
      </div>
    </div>
  );
};
export default GameOver;
