import { Canvas } from '@react-three/fiber';
import './App.css';
import Items from './components/Item';
import { OrthographicCamera, ScrollControls } from '@react-three/drei';
import { items } from './assets/imgUrl';
import ScrollSnapper from './components/ScrollSnapper';

function App() {
  const totalItems = items.length;

  const isInfinite = totalItems >= 4;

  return (
    <Canvas>
      <OrthographicCamera
        makeDefault
        zoom={1}
        position={[0, 0, 1]}
        near={-400}
      />

      <ScrollControls
        pages={totalItems}
        damping={0.2}
        infinite={isInfinite}
        enabled={totalItems > 1}
        maxSpeed={1.0}
      >
        <Items totalItems={totalItems} isInfinite={isInfinite} />

        <ScrollSnapper totalItems={totalItems} isInfinite={isInfinite} />
      </ScrollControls>
    </Canvas>
  );
}

export default App;
