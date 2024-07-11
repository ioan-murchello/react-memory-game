import { useContext, useState } from 'react';
import { GameContext } from '../context';
import { TbCards } from 'react-icons/tb';

const MainMenu = () => {
  const { setGameForTwoPlayers, selectNumberOfCards, setStartGame, gameState } =
    useContext(GameContext);

  const [activePlayer, setActivePlayer] = useState(false);
  const [activeLevel, setActiveLavel] = useState(0);
  const [levels, setLevels] = useState(['easy', 'medium', 'hard']);

  const handlePlayer = (bool) => {
    if (bool === false) {
      setGameForTwoPlayers(false);
    } else {
      setGameForTwoPlayers(true);
    }
    setActivePlayer(bool);
  };

  const handleLevel = (index) => {
    setActiveLavel(index);
    selectNumberOfCards(index);
  };
  return (
    <div className='main-menu'>
      <div className='select-players'>
        <button
          type='button'
          className={`btn ${!activePlayer ? 'activePlayer' : ''}`}
          onClick={() => handlePlayer(false)}
           
        >
          1 Player
        </button>
        <button
          className={`btn ${activePlayer ? 'activePlayer' : ''}`}
          type='button'
          onClick={() => handlePlayer(true)}
           
        >
          2 Player
        </button>
      </div>
      <div className='select-players'>
        {levels.map((el, index) => {
          return (
            <button
              className={` btn ${index === activeLevel ? 'activePlayer' : ''}`}
              key={index}
              type='button'
              onClick={() => handleLevel(index)}
            >
              <div
                className='btn-element'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: '1rem',
                  fontSize: '1.5rem',
                }}
              >
                {el}
              </div>
            </button>
          );
        })}
      </div>
      <button className='btn' type='button' onClick={setStartGame}>
        <span className='btn-element'>Play</span>
      </button>
    </div>
  );
};
export default MainMenu;
