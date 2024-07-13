import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context';
import Card from './Card';
import GameOver from './GameOver';
import { imagesForCards } from '../datas';
import { RxExit } from 'react-icons/rx';

const Playground = () => {
  const {
    exitGame,
    gameState: { cardsMatched, level, twoPlayers, scores },
    incrementMatched,
    setScores,
  } = useContext(GameContext);

  let images = [];

  if (level === 0) {
    images = imagesForCards
      .slice(0, 5)
      .flatMap(({ img }, index) => [
        { id: `${index}-1`, img, isMatched: false, isFlipped: false },
        { id: `${index}-2`, img, isMatched: false, isFlipped: false },
      ])
      .sort(() => Math.random() - 0.5);
  }
  if (level === 1) {
    images = imagesForCards
      .slice(0, 8)
      .flatMap(({ img }, index) => [
        { id: `${index}-1`, img, isMatched: false, isFlipped: false },
        { id: `${index}-2`, img, isMatched: false, isFlipped: false },
      ])
      .sort(() => Math.random() - 0.5);
  }
  if (level === 2) {
    images = imagesForCards
      .flatMap(({ img }, index) => [
        { id: `${index}-1`, img, isMatched: false, isFlipped: false },
        { id: `${index}-2`, img, isMatched: false, isFlipped: false },
      ])
      .sort(() => Math.random() - 0.5);
  }

  const [cards, setCards] = useState(images);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [playersSwitcher, setPlayersSwitcher] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const shuffleAndResetCards = () => {
    const shuffledCards = cards
      .map((card) => ({ ...card, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);

    setSelectedCards([]);
    setPlayersSwitcher(false);
    setCards(shuffledCards);
  };

  useEffect(() => {
    setCards(images);
  }, []);

  const handleIndexes = (index, id) => {
    const updatedCards = cards.map((card, idx) =>
      idx === index && card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  const moreThen600 = windowWidth > 600;
  const lessThen600 = windowWidth < 600;

  const styled = {
    gridTemplateRows: `repeat(${
      level === 0 && lessThen600
        ? 5
        : level === 0 && moreThen600
        ? 2
        : level === 1
        ? 4
        : level === 2 && lessThen600
        ? 4
        : level === 2 && moreThen600
        ? 4
        : 2
    }, 1fr)`,
    gridTemplateColumns: `repeat(${
      level === 0 && lessThen600
        ? 2
        : level === 0 && moreThen600
        ? 5
        : level === 1
        ? 4
        : level === 2 && lessThen600
        ? 6
        : level === 2 && moreThen600
        ? 6
        : 5
    }, 1fr)`,
    width: `${
      level === 0 && lessThen600
        ? '60%'
        : level === 0 && moreThen600
        ? '80%'
        : level === 1 && moreThen600 && twoPlayers
        ? '50%'
        : level === 1 && moreThen600
        ? '60%'
        : level === 2 && lessThen600
        ? '96%'
        : '65%'
    }`,
    height: `${
      level === 0 && lessThen600 && twoPlayers
        ? '62%'
        : level === 0 && lessThen600
        ? '60%'
        : level === 0 && moreThen600
        ? '46%'
        : level === 1 && moreThen600 && twoPlayers
        ? '60%'
        : level === 1 && moreThen600
        ? '70%'
        : level === 2 && lessThen600
        ? '46%'
        : '50%'
    }`,
  };

  const matchedCards = () => {
    if (selectedCards[0].img === selectedCards[1].img) {
      if (!playersSwitcher) {
        setScores('firstPlayer');
      }
      if (playersSwitcher) {
        setScores('secondPlayer');
      }
      incrementMatched();
      let updatedCards = cards.map((card) => {
        if (
          card.img === selectedCards[0].img &&
          card.img === selectedCards[1].img
        ) {
          return { ...card, isMatched: true, isFlipped: true };
        }
        return card;
      });
      setCards(updatedCards);
    }
    if (selectedCards[0].img !== selectedCards[1].img) {
      setPlayersSwitcher((prev) => !prev);
      let updatedCards = cards.map((card) => {
        if (
          card.img === selectedCards[0].img ||
          card.img === selectedCards[1].img
        ) {
          return { ...card, isMatched: false, isFlipped: false };
        }
        return card;
      });
      setCards(updatedCards);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(() => {
        matchedCards();
        setSelectedCards([]);
      }, 700);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (cardsMatched === cards.length / 2) {
      setShowModal(true);
    }
  }, [cardsMatched]);

  return (
    <div className='playfield'>
      {twoPlayers ? (
        <div className='players'>
          <div className={`${!playersSwitcher ? 'currentPlayer' : ''}`}>
            Player 1 {' /  '} score:
            <span> {scores.firstPlayer}</span>
          </div>
          <div className={`${playersSwitcher ? 'currentPlayer' : ''}`}>
            Player 2 {' /  '} score:
            <span> {scores.secondPlayer}</span>
          </div>
        </div>
      ) : (
        <div className='player-score'>
          {!twoPlayers && (
            <span>
              score: {cardsMatched} / {cards.length / 2}
            </span>
          )}
        </div>
      )}
      <div
        style={styled}
        className='playground animate__animated animate__fadeIn'
      >
        {cards.length > 0 &&
          cards.map((el, index) => (
            <Card
              key={el.id}
              card={el}
              setSelectedCards={setSelectedCards}
              selectedCards={selectedCards}
              handleIndexes={() => handleIndexes(index, el.id)}
            />
          ))}
      </div>

      <button className='btn' onClick={exitGame}>
        <RxExit className='btn-element' />
      </button>

      {showModal && (
        <GameOver
          shuffleAndResetCards={shuffleAndResetCards}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Playground;
