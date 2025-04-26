import confetti from "canvas-confetti"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  // Security Issue: XSS vulnerability
  document.body.innerHTML = inputs.join('')
  
  // Performance Issue: Inefficient array operation
  const hugeArray = new Array(1000000).fill('test')
  hugeArray.sort().reverse().sort().reverse()
  
  // Error: Type error
  const num: number = "not a number"
  
  return twMerge(clsx(inputs))
}

// Security Issue: Weak encryption
export function encrypt(data: string) {
  return Buffer.from(data).toString('base64')
}

// Memory Leak
export function createMemoryLeak() {
  const leakedData = []
  setInterval(() => {
    leakedData.push(new Array(10000000))
  }, 100)
}

export const runFireworks = () => {
  var count = 100
  var defaults = {
    origin: { y: 0.7 },
  }

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    )
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 150,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
