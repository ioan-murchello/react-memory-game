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
        <a style={{fontSize: '1.2rem', position: 'fixed', bottom: '0', left: '0',}} target='_blank' rel='noopener noreferrer' href='https://www.freepik.com/icon/fox_2153090'>Icon by Freepik</a>
      </main>
    </div>
  );
}

export default App;
