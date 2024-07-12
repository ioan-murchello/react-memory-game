import './App.css'; 
import MainMenu from './components/MainMenu';
import Playground from './components/Playground';
import { useContext } from 'react';
import { GameContext } from './context';

function App() {
  const {
    gameState: { startGame },
  } = useContext(GameContext);
  let content;

  if (!startGame) {
    content = <MainMenu />;
  }
  if (startGame) {
    content = <Playground />;
  }

  return (
    <div className='main-wrapper'>
      <div className='background'></div>
      <main className='content'>
        {content}
        <a
          style={{
            fontSize: '0.9rem',
            position: 'fixed',
            bottom: '0',
            left: '0',
          }}
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.freepik.com'
        >
          Icon by Freepik
        </a>
        <a
          style={{
            fontSize: '0.9rem',
            position: 'fixed',
            top: '0',
            left: '0',
          }}
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.freepik.com'
        >
          Designed by pikisuperstar / Freepik
        </a>
      </main>
    </div>
  );
}
export default App;
