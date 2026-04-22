const confettiColors = ["#8b0000", "#c2185b", "#f2b6c6", "#fff0f3", "#e7a1b7"];
const MUSIC_SRC = "audio/birthday.mp3";
const MUSIC_MUTED_KEY = "birthdayMusicMuted";

function goTo(page) {
  window.location.href = page;
}

function smoothGoTo(page) {
  document.body.classList.add("page-transition");
  setTimeout(() => {
    window.location.href = page;
  }, 360);
}

function launchConfetti(count = 60) {
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${2.8 + Math.random() * 2.2}s`;
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.opacity = `${0.42 + Math.random() * 0.28}`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5200);
  }
}

function setupFloatingHearts() {
  const heartLayer = document.createElement("div");
  heartLayer.className = "heart-layer";
  document.body.appendChild(heartLayer);

  for (let i = 0; i < 10; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "\u2665";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.bottom = `${-10 - Math.random() * 60}px`;
    heart.style.animationDuration = `${16 + Math.random() * 10}s`;
    heart.style.animationDelay = `${Math.random() * 10}s`;
    heart.style.fontSize = `${10 + Math.random() * 10}px`;
    heartLayer.appendChild(heart);
  }
}

function setupBackgroundMusic() {
  const audio = new Audio(MUSIC_SRC);
  audio.loop = true;
  audio.volume = 0.28;

  let isMuted = localStorage.getItem(MUSIC_MUTED_KEY) === "true";
  audio.muted = isMuted;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "music-toggle";
  toggleBtn.type = "button";

  const updateButtonLabel = () => {
    toggleBtn.textContent = isMuted ? "Unmute music" : "Mute music";
  };

  const playMusic = () => {
    if (isMuted) return;
    audio.play().catch(() => {
      // Ignore autoplay restrictions until the visitor interacts again.
    });
  };

  updateButtonLabel();
  document.body.appendChild(toggleBtn);

  const firstInteractionHandler = () => {
    playMusic();
    document.removeEventListener("pointerdown", firstInteractionHandler);
    document.removeEventListener("keydown", firstInteractionHandler);
  };

  document.addEventListener("pointerdown", firstInteractionHandler, { once: true });
  document.addEventListener("keydown", firstInteractionHandler, { once: true });

  toggleBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    audio.muted = isMuted;
    localStorage.setItem(MUSIC_MUTED_KEY, String(isMuted));
    updateButtonLabel();

    if (!isMuted) {
      playMusic();
    } else {
      audio.pause();
    }
  });
}

function setupAgeGuesser() {
  const guessBtn = document.getElementById("ageGuessBtn");
  const output = document.getElementById("ageGuessOutput");
  if (!guessBtn || !output) return;

  const wrongAges = ["108", "17 and a half", "404", "Forever 21?", "3000", "8 at heart"];
  let isRunning = false;

  guessBtn.addEventListener("click", () => {
    if (isRunning) return;
    isRunning = true;
    guessBtn.disabled = true;
    guessBtn.textContent = "Counting in a very biased way...";

    let loops = 0;
    const revealTimer = setInterval(() => {
      const age = wrongAges[Math.floor(Math.random() * wrongAges.length)];
      output.textContent = `Hmm... maybe ${age}?`;
      output.classList.remove("flashing");
      void output.offsetWidth;
      output.classList.add("flashing");
      loops += 1;

      if (loops >= 5) {
        clearInterval(revealTimer);
        output.textContent = "No matter the number, you are still my favorite person.";
        guessBtn.textContent = "Guess your age";
        guessBtn.disabled = false;
        isRunning = false;
        launchConfetti(14);
      }
    }, 760);
  });
}

function setupFlirtyCards() {
  const cards = document.querySelectorAll(".flirty-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const message = card.dataset.message;
      const messageNode = card.querySelector(".card-message");
      if (!messageNode || !message) return;

      messageNode.textContent = message;
      card.classList.add("revealed");
      launchConfetti(6);
    });
  });
}

function setupTypewriterMessage() {
  const typewriterNode = document.getElementById("typewriterText");
  const cursorNode = document.getElementById("typeCursor");
  if (!typewriterNode) return;

  const text =
    "I tease you a lot...\nbut the truth is, life feels softer with you in it.\nYou make ordinary moments feel quietly special.";
  let index = 0;

  const timer = setInterval(() => {
    typewriterNode.textContent += text[index];
    index += 1;

    if (index >= text.length) {
      clearInterval(timer);
      if (cursorNode) {
        cursorNode.style.opacity = "0";
      }
    }
  }, 52);
}

function setupFinalPage() {
  const finalButton = document.getElementById("celebrateBtn");
  if (!finalButton) return;

  setTimeout(() => {
    launchConfetti(48);
  }, 260);

  finalButton.addEventListener("click", () => {
    launchConfetti(42);
    finalButton.textContent = "That felt a little magical";
  });
}

function setupLandingEffects() {
  const landingCard = document.querySelector(".landing-card");
  if (!landingCard) return;

  setInterval(() => {
    launchConfetti(3);
  }, 2400);
}

window.addEventListener("DOMContentLoaded", () => {
  setupFloatingHearts();
  setupBackgroundMusic();
  setupLandingEffects();
  setupAgeGuesser();
  setupFlirtyCards();
  setupTypewriterMessage();
  setupFinalPage();
});
