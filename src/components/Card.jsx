
import { useState, useEffect } from 'react'; 
import 'animate.css';

const Card = ({
  card,
  selectedCards,
  index,
  setSelectedCards,
  handleIndexes,
}) => {
  const [isFlipped, setIsFlipped] = useState(card.isFlipped);
  const [isAnimating, setIsAnimating] = useState(false);  

  useEffect(() => {
    setIsFlipped(card.isFlipped);
  }, [card.isFlipped]);

  const handleClick = (e, index) => {
    e.stopPropagation();
    if(selectedCards.length >= 2) { 
      return
    }

    if (!card.isFlipped && !isAnimating) {
      setIsAnimating(true)
      handleIndexes(index, card.id);
      setSelectedCards([...selectedCards, card]);
      setTimeout(() => {setIsAnimating(false); }, 300)
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
        <div className='front'></div>
        <div className='back'>
          <img src={card.img} alt='Back' />
        </div>
      </div>
    </div>
  );
};
export default Card;
