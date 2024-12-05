export function animateDown() {
  const duration = 1500
  const start = window.scrollY
  const end = window.innerHeight
  const startTime = performance.now()

  function animate() {
    const currentTime = performance.now()
    const progress = (currentTime - startTime) / duration
    const scrollY = start + (end - start) * progress
    window.scrollTo(0, scrollY)
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}

export function animateUp() {
  const duration = 1500
  const start = window.scrollY
  const end = 0
  const startTime = performance.now()

  function animate() {
    const currentTime = performance.now()
    const progress = (currentTime - startTime) / duration
    const scrollY = start + (end - start) * progress
    window.scrollTo(0, scrollY)
    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  animate()
}