(function() {
  const FONT_STEP = 0.1;
  const MIN_FONT = 0.8;
  const MAX_FONT = 2.0;

  // Load saved preferences
  function loadPrefs() {
    const savedSize = localStorage.getItem('fontSize');
    const savedDark = localStorage.getItem('darkMode');
    
    if (savedSize) {
      document.documentElement.style.setProperty('--font-size', savedSize + 'rem');
    }
    if (savedDark === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  // Get current font size as number
  function getCurrentSize() {
    const current = getComputedStyle(document.documentElement)
      .getPropertyValue('--font-size');
    return parseFloat(current) || 1.1;
  }

  // Font size controls
  document.getElementById('increase')?.addEventListener('click', () => {
    let size = Math.min(getCurrentSize() + FONT_STEP, MAX_FONT);
    document.documentElement.style.setProperty('--font-size', size + 'rem');
    localStorage.setItem('fontSize', size);
  });

  document.getElementById('decrease')?.addEventListener('click', () => {
    let size = Math.max(getCurrentSize() - FONT_STEP, MIN_FONT);
    document.documentElement.style.setProperty('--font-size', size + 'rem');
    localStorage.setItem('fontSize', size);
  });

  // Dark mode toggle
  document.getElementById('dark-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
  });

  // Progress bar
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  // Reading time
  function calcReadingTime() {
    const article = document.querySelector('article');
    const readingTimeEl = document.querySelector('.reading-time');
    
    if (!article || !readingTimeEl) return;
    
    const text = article.innerText;
    const wordCount = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const totalMinutes = Math.ceil(wordCount / wordsPerMinute);
    
    readingTimeEl.textContent = `${totalMinutes} min read`;
    
    // Show "Finished" at the end
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      
      if (progress >= 0.95) {
        readingTimeEl.textContent = `Finished`;
      } else {
        readingTimeEl.textContent = `${totalMinutes} min read`;
      }
    });
  }

  // Initialize
  loadPrefs();
  calcReadingTime();
})();
