import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import Starfield from './components/Starfield'
import ParticleRing from './components/ParticleRing'
import StartButton from './components/StartButton'

export default function App() {
  const [showButton, setShowButton] = useState(false)

  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Starfield />
          <ParticleRing onConverge={() => setShowButton(true)} />
        </Suspense>
      </Canvas>
      <StartButton visible={showButton} />
    </>
  )
}
