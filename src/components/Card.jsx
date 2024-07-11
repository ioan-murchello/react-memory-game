
import { useState, useEffect } from 'react';
import mountains from '../images/mountains.svg';
import 'animate.css';

const Card = ({
  card,
  selectedCards,
  index,
  setSelectedCards,
  handleIndexes,
}) => {
  const [isFlipped, setIsFlipped] = useState(card.isFlipped);

  useEffect(() => {
    setIsFlipped(card.isFlipped);
  }, [card.isFlipped]);

  const handleClick = (e, index) => {
    e.stopPropagation();
    if (!card.isFlipped) {
      handleIndexes(index, card.id);
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <div
      className={`card animate__animated  ${
        isFlipped ? 'flipped animate__pulse' : 'animate__jello_custom'
      }`}
      onClick={(e) => handleClick(e, index)}
    >
      <div className='inner'>
        <div className='front'>
          <img src={mountains} alt='Front' />
        </div>
        <div className='back'>
          <img src={card.img} alt='Back' />
        </div>
      </div>
    </div>
  );
};
export default Card;
