import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleRing({ onConverge }) {
  const groupRef = useRef()
  const [particles, setParticles] = useState([])
  const [exploded, setExploded] = useState(false)
  const [converged, setConverged] = useState(false)

  useEffect(() => {
    const count = 60
    const radius = 1.5
    const base = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      base.push({
        angle,
        orbit: new THREE.Vector3(
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.2,
          Math.sin(angle) * radius
        ),
        position: new THREE.Vector3(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        )
      })
    }
    setParticles(base)

    setTimeout(() => setExploded(true), 2000)
    setTimeout(() => {
      setConverged(true)
      onConverge()
    }, 4500)
  }, [onConverge])

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    groupRef.current.children.forEach((mesh, i) => {
      const p = particles[i]
      if (!p) return

      if (!exploded) {
        mesh.position.lerp(p.orbit, 0.1)
      } else if (!converged) {
        p.position.add(p.velocity.clone().multiplyScalar(0.01))
        mesh.position.lerp(p.position, 0.05)
      } else {
        mesh.position.lerp(new THREE.Vector3(0, 0, 0), 0.05)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial color="gold" />
        </mesh>
      ))}
    </group>
  )
}
