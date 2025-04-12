import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield() {
  const group = useRef()
  const positions = useRef(
    new Array(300).fill().map(() => [
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50,
      (Math.random() - 0.5) * 50
    ])
  )

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.002
  })

  return (
    <group ref={group}>
      {positions.current.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#222" />
        </mesh>
      ))}
    </group>
  )
}
