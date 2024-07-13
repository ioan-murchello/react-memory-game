import { useContext, useState } from 'react';
import { GameContext } from '../context';
import { TfiReload } from 'react-icons/tfi';
import { RxExit } from 'react-icons/rx'; 
import trophy from '../images/trophy_gold.png';
import hands from '../images/handshake.png'
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
// scores.firstPlayer === scores.secondPlayer ? true : null;
  const equal = true


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
                  src={hands}
                  alt='image'
                  style={{ width: '150px', height: '150px' }}
                />
                <h2>Scores are equal</h2>
                <p>
                  FirstPlayer: {scores.firstPlayer}, SecondPlayer:{' '}
                  {scores.secondPlayer}
                </p>
              </div>
            ) : (
              <div className='scores-info'>
                <img
                  src={trophy}
                  alt='trophy'
                  style={{ width: '150px', height: '150px' }}
                />
                <h2>{more ? 'Player 1' : 'Player 2'} Won!</h2>
                <p>Score: {more ? scores.firstPlayer : scores.secondPlayer}</p>
              </div>
            )}
          </div>
        ) : (
          <div className='single-player'>
            <img src={trophy} alt='trophy' />
            {/* <h2 style={{ textAlign: 'center' }}>Complete</h2> */}
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
