"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface ShaderAnimationProps {
  className?: string
}

const ShaderAnimation: React.FC<ShaderAnimationProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const animationRef = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 1
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    )
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          ),
        },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        varying vec2 vUv;

        #define PI 3.14159265359

        // Noise functions
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }

        float fbm(vec2 st) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 0.0;
          for (int i = 0; i < 6; i++) {
            value += amplitude * noise(st);
            st *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        // Ripple effect
        float ripple(vec2 uv, vec2 center, float time) {
          float dist = length(uv - center);
          return sin(dist * 20.0 - time * 3.0) * exp(-dist * 3.0);
        }

        void main() {
          vec2 uv = vUv;
          vec2 pixelCoord = uv * uResolution;

          // Aspect ratio correction
          float aspect = uResolution.x / uResolution.y;
          vec2 uvCorrected = vec2(uv.x * aspect, uv.y);

          // Time-based animation
          float time = uTime * 0.5;

          // Create flowing noise pattern
          vec2 q = vec2(0.0);
          q.x = fbm(uvCorrected + 0.1 * time);
          q.y = fbm(uvCorrected + vec2(1.0));

          vec2 r = vec2(0.0);
          r.x = fbm(uvCorrected + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time);
          r.y = fbm(uvCorrected + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time);

          float f = fbm(uvCorrected + r);

          // Mouse interaction ripples
          vec2 mouseUV = uMouse;
          mouseUV.x *= aspect;
          float mouseRipple = ripple(uvCorrected, mouseUV, uTime);

          // Color palette - Purple/Blue theme for real estate
          vec3 color1 = vec3(0.05, 0.0, 0.15);  // Deep purple-black
          vec3 color2 = vec3(0.2, 0.0, 0.4);    // Dark purple
          vec3 color3 = vec3(0.4, 0.1, 0.6);    // Medium purple
          vec3 color4 = vec3(0.6, 0.2, 0.8);    // Light purple

          // Mix colors based on noise
          vec3 color = mix(color1, color2, clamp(f * f * 2.0, 0.0, 1.0));
          color = mix(color, color3, clamp(length(q), 0.0, 1.0));
          color = mix(color, color4, clamp(length(r.x), 0.0, 1.0) * 0.5);

          // Add ripple highlight
          color += vec3(0.3, 0.1, 0.5) * mouseRipple * 0.5;

          // Add subtle gradient overlay
          float gradient = smoothstep(0.0, 1.0, uv.y);
          color = mix(color * 0.7, color, gradient);

          // Add some sparkle/stars effect
          float stars = pow(random(floor(pixelCoord * 0.5)), 20.0);
          stars *= sin(uTime * 2.0 + random(floor(pixelCoord * 0.5)) * 6.28) * 0.5 + 0.5;
          color += vec3(stars) * 0.3;

          // Vignette effect
          float vignette = 1.0 - length(uv - 0.5) * 0.8;
          color *= vignette;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
    materialRef.current = shaderMaterial

    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, shaderMaterial)
    scene.add(mesh)

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseRef.current.x = (event.clientX - rect.left) / rect.width
        mouseRef.current.y = 1.0 - (event.clientY - rect.top) / rect.height
      }
    }

    // Touch move handler for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (containerRef.current && event.touches.length > 0) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseRef.current.x =
          (event.touches[0].clientX - rect.left) / rect.width
        mouseRef.current.y =
          1.0 - (event.touches[0].clientY - rect.top) / rect.height
      }
    }

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera || !shaderMaterial)
        return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      shaderMaterial.uniforms.uResolution.value.set(width, height)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      if (shaderMaterial) {
        shaderMaterial.uniforms.uTime.value += 0.016
        shaderMaterial.uniforms.uMouse.value.set(
          mouseRef.current.x,
          mouseRef.current.y
        )
      }

      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("resize", handleResize)

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }

      geometry.dispose()
      shaderMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
}

export default ShaderAnimation
