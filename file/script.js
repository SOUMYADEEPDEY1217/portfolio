(function () {
  "use strict";

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
      });
    });
  }


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* =========================================================
     SCROLL REVEAL ANIMATION
     ========================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }


  /* =========================================================
     TYPING EFFECT
     ========================================================= */

  const typingElement = document.querySelector(".typing");

  if (typingElement) {
    const words = [
      "Computer Science Engineer",
      "Full Stack Developer",
      "AI Enthusiast",
      "Cybersecurity Explorer",
      "Problem Solver"
    ];

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeText() {
      const currentWord = words[wordIndex];

      if (!deleting) {
        typingElement.textContent =
          currentWord.substring(0, characterIndex + 1);

        characterIndex++;

        if (characterIndex === currentWord.length) {
          deleting = true;

          setTimeout(typeText, 1600);
          return;
        }
      } else {
        typingElement.textContent =
          currentWord.substring(0, characterIndex - 1);

        characterIndex--;

        if (characterIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(typeText, deleting ? 55 : 90);
    }

    typeText();
  }


  /* =========================================================
     NAVBAR SCROLL EFFECT
     ========================================================= */

  const navbar = document.querySelector("header");

  window.addEventListener(
    "scroll",
    function () {
      if (!navbar) return;

      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { passive: true }
  );


  /* =========================================================
     ACTIVE NAVIGATION LINK
     ========================================================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(
    'nav a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove("active");

              if (
                link.getAttribute("href") ===
                "#" + entry.target.id
              ) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }


  /* =========================================================
     CARD TILT EFFECT
     ========================================================= */

  const tiltCards = document.querySelectorAll(
    ".tilt, .game-card, .project-card"
  );

  tiltCards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        ((y - centerY) / centerY) * -4;

      const rotateY =
        ((x - centerX) / centerX) * 4;

      card.style.transform =
        "perspective(800px) rotateX(" +
        rotateX +
        "deg) rotateY(" +
        rotateY +
        "deg) translateY(-3px)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });


  /* =========================================================
     CURSOR EFFECT
     ========================================================= */

  const cursor = document.querySelector(".cursor");

  if (cursor && window.matchMedia("(pointer:fine)").matches) {
    document.addEventListener("mousemove", function (event) {
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";
    });

    document
      .querySelectorAll("a, button, .tilt, .game-card")
      .forEach(function (element) {
        element.addEventListener("mouseenter", function () {
          cursor.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", function () {
          cursor.classList.remove("cursor-hover");
        });
      });
  }


  /* =========================================================
     REACTION RUSH GAME
     ========================================================= */

  const reactionBoard =
    document.getElementById("reaction-board");

  const reactionTarget =
    document.getElementById("reaction-target");

  const reactionStart =
    document.getElementById("reaction-start");

  const reactionStatus =
    document.getElementById("reaction-status");

  const reactionTime =
    document.getElementById("reaction-time");

  const reactionBest =
    document.getElementById("reaction-best");

  if (
    reactionBoard &&
    reactionTarget &&
    reactionStart
  ) {
    let reactionTimer = null;
    let reactionStartTime = 0;
    let reactionWaiting = false;

    let bestReaction = Number(
      localStorage.getItem("reactionBest") || 0
    );

    reactionBest.textContent = bestReaction
      ? bestReaction + " ms"
      : "—";

    reactionStart.addEventListener("click", function () {
      clearTimeout(reactionTimer);

      reactionTarget.style.display = "none";
      reactionWaiting = true;

      reactionStatus.textContent =
        "Wait for the target...";

      const delay =
        700 + Math.random() * 1800;

      reactionTimer = setTimeout(function () {
        const maxX =
          reactionBoard.clientWidth - 54;

        const maxY =
          reactionBoard.clientHeight - 54;

        reactionTarget.style.left =
          8 + Math.random() * maxX + "px";

        reactionTarget.style.top =
          8 + Math.random() * maxY + "px";

        reactionTarget.style.display =
          "block";

        reactionStartTime =
          performance.now();

        reactionWaiting = false;

        reactionStatus.textContent =
          "GO — HIT IT!";
      }, delay);
    });

    reactionTarget.addEventListener(
      "click",
      function (event) {
        event.stopPropagation();

        if (reactionWaiting) return;

        const reaction =
          Math.round(
            performance.now() -
              reactionStartTime
          );

        reactionTime.textContent =
          reaction + " ms";

        if (
          !bestReaction ||
          reaction < bestReaction
        ) {
          bestReaction = reaction;

          localStorage.setItem(
            "reactionBest",
            bestReaction
          );

          reactionBest.textContent =
            bestReaction + " ms";

          reactionStatus.textContent =
            "New personal best!";
        } else {
          reactionStatus.textContent =
            "Nice! Try to beat your best.";
        }

        reactionTarget.style.display =
          "none";

        reactionWaiting = false;
      }
    );

    reactionBoard.addEventListener(
      "click",
      function () {
        if (reactionWaiting) {
          clearTimeout(reactionTimer);

          reactionTarget.style.display =
            "none";

          reactionWaiting = false;

          reactionStatus.textContent =
            "Too early! Try again.";
        }
      }
    );
  }


  /* =========================================================
     MEMORY MATRIX GAME
     ========================================================= */

  const memoryCells =
    document.querySelectorAll(".memory-cell");

  const memoryStart =
    document.getElementById("memory-start");

  const memoryStatus =
    document.getElementById("memory-status");

  const memoryLevel =
    document.getElementById("memory-level");

  const memoryBest =
    document.getElementById("memory-best");

  if (
    memoryCells.length &&
    memoryStart
  ) {
    let sequence = [];
    let playerIndex = 0;
    let level = 0;
    let locked = true;

    let bestMemory = Number(
      localStorage.getItem("memoryBest") || 0
    );

    memoryBest.textContent = bestMemory;

    function flashCell(index) {
      memoryCells[index].classList.add(
        "flash"
      );

      setTimeout(function () {
        memoryCells[index].classList.remove(
          "flash"
        );
      }, 350);
    }

    function showSequence() {
      locked = true;
      playerIndex = 0;

      memoryStatus.textContent =
        "Memorize the sequence...";

      sequence.forEach(function (
        index,
        position
      ) {
        setTimeout(function () {
          flashCell(index);
        }, position * 550 + 300);
      });

      setTimeout(
        function () {
          locked = false;

          memoryStatus.textContent =
            "Your turn — repeat it.";
        },
        sequence.length * 550 + 500
      );
    }

    function nextLevel() {
      level++;

      memoryLevel.textContent =
        level;

      sequence.push(
        Math.floor(
          Math.random() * 9
        )
      );

      showSequence();
    }

    memoryStart.addEventListener(
      "click",
      function () {
        sequence = [];
        playerIndex = 0;
        level = 0;
        locked = true;

        memoryLevel.textContent = "0";

        memoryStatus.textContent =
          "Starting...";

        setTimeout(nextLevel, 400);
      }
    );

    memoryCells.forEach(function (cell) {
      cell.addEventListener(
        "click",
        function () {
          if (locked) return;

          const index =
            Number(cell.dataset.index);

          if (
            index ===
            sequence[playerIndex]
          ) {
            cell.classList.add("good");

            setTimeout(function () {
              cell.classList.remove(
                "good"
              );
            }, 180);

            playerIndex++;

            if (
              playerIndex ===
              sequence.length
            ) {
              locked = true;

              memoryStatus.textContent =
                "Correct! Next level...";

              setTimeout(
                nextLevel,
                700
              );
            }
          } else {
            cell.classList.add("bad");

            setTimeout(function () {
              cell.classList.remove(
                "bad"
              );
            }, 250);

            locked = true;

            memoryStatus.textContent =
              "Game over! Press start.";

            if (level > bestMemory) {
              bestMemory = level;

              localStorage.setItem(
                "memoryBest",
                bestMemory
              );

              memoryBest.textContent =
                bestMemory;
            }
          }
        }
      );
    });
  }


  /* =========================================================
     NEON SNAKE
     ========================================================= */

  const snakeCanvas =
    document.getElementById("snake-canvas");

  const snakeStart =
    document.getElementById("snake-start");

  const snakeScore =
    document.getElementById("snake-score");

  const snakeBest =
    document.getElementById("snake-best");

  const snakeStatus =
    document.getElementById("snake-status");

  if (
    snakeCanvas &&
    snakeStart
  ) {
    const ctx =
      snakeCanvas.getContext("2d");

    const gridSize = 13;
    const cellSize = 20;

    let snake = [];
    let food = {};
    let direction = {
      x: 1,
      y: 0
    };

    let nextDirection = {
      x: 1,
      y: 0
    };

    let snakeScoreValue = 0;
    let snakeBestValue = Number(
      localStorage.getItem(
        "snakeBest"
      ) || 0
    );

    let snakeTimer = null;
    let snakeRunning = false;

    snakeBest.textContent =
      snakeBestValue;

    function drawSnake() {
      ctx.fillStyle = "#080B13";

      ctx.fillRect(
        0,
        0,
        snakeCanvas.width,
        snakeCanvas.height
      );

      /* Grid */

      ctx.strokeStyle =
        "rgba(255,255,255,.05)";

      for (
        let i = 0;
        i <= gridSize;
        i++
      ) {
        ctx.beginPath();

        ctx.moveTo(
          i * cellSize,
          0
        );

        ctx.lineTo(
          i * cellSize,
          snakeCanvas.height
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(
          0,
          i * cellSize
        );

        ctx.lineTo(
          snakeCanvas.width,
          i * cellSize
        );

        ctx.stroke();
      }

      /* Food */

      ctx.fillStyle = "#FFB454";

      ctx.shadowColor =
        "#FFB454";

      ctx.shadowBlur = 12;

      ctx.fillRect(
        food.x * cellSize + 5,
        food.y * cellSize + 5,
        10,
        10
      );

      ctx.shadowBlur = 0;

      /* Snake */

      snake.forEach(function (
        segment,
        index
      ) {
        ctx.fillStyle =
          index === 0
            ? "#48E5FF"
            : "#B478FF";

        ctx.shadowColor =
          ctx.fillStyle;

        ctx.shadowBlur =
          index === 0 ? 12 : 5;

        ctx.fillRect(
          segment.x *
            cellSize +
            2,
          segment.y *
            cellSize +
            2,
          cellSize - 4,
          cellSize - 4
        );
      });

      ctx.shadowBlur = 0;
    }

    function createFood() {
      do {
        food = {
          x: Math.floor(
            Math.random() *
              gridSize
          ),

          y: Math.floor(
            Math.random() *
              gridSize
          )
        };
      } while (
        snake.some(function (
          segment
        ) {
          return (
            segment.x === food.x &&
            segment.y === food.y
          );
        })
      );
    }

    function startSnake() {
      clearInterval(snakeTimer);

      snake = [
        { x: 6, y: 6 },
        { x: 5, y: 6 },
        { x: 4, y: 6 }
      ];

      direction = {
        x: 1,
        y: 0
      };

      nextDirection = {
        x: 1,
        y: 0
      };

      snakeScoreValue = 0;

      snakeScore.textContent =
        "0";

      snakeStatus.textContent =
        "Use arrow keys to play.";

      createFood();

      snakeRunning = true;

      drawSnake();

      snakeTimer = setInterval(
        updateSnake,
        120
      );
    }

    function endSnake() {
      clearInterval(snakeTimer);

      snakeRunning = false;

      if (
        snakeScoreValue >
        snakeBestValue
      ) {
        snakeBestValue =
          snakeScoreValue;

        localStorage.setItem(
          "snakeBest",
          snakeBestValue
        );

        snakeBest.textContent =
          snakeBestValue;

        snakeStatus.textContent =
          "NEW HIGH SCORE!";
      } else {
        snakeStatus.textContent =
          "Game over! Restart and try again.";
      }
    }

    function updateSnake() {
      direction =
        nextDirection;

      const head = {
        x:
          snake[0].x +
          direction.x,

        y:
          snake[0].y +
          direction.y
      };

      const hitWall =
        head.x < 0 ||
        head.y < 0 ||
        head.x >= gridSize ||
        head.y >= gridSize;

      const hitSelf =
        snake.some(function (
          segment
        ) {
          return (
            segment.x === head.x &&
            segment.y === head.y
          );
        });

      if (hitWall || hitSelf) {
        endSnake();
        return;
      }

      snake.unshift(head);

      if (
        head.x === food.x &&
        head.y === food.y
      ) {
        snakeScoreValue++;

        snakeScore.textContent =
          snakeScoreValue;

        createFood();
      } else {
        snake.pop();
      }

      drawSnake();
    }

    function changeDirection(
      x,
      y
    ) {
      if (!snakeRunning) return;

      if (
        x === -direction.x &&
        y === -direction.y
      ) {
        return;
      }

      nextDirection = {
        x: x,
        y: y
      };
    }

    document.addEventListener(
      "keydown",
      function (event) {
        const key =
          event.key.toLowerCase();

        if (
          key === "arrowup" ||
          key === "w"
        ) {
          event.preventDefault();

          changeDirection(
            0,
            -1
          );
        }

        if (
          key === "arrowdown" ||
          key === "s"
        ) {
          event.preventDefault();

          changeDirection(
            0,
            1
          );
        }

        if (
          key === "arrowleft" ||
          key === "a"
        ) {
          event.preventDefault();

          changeDirection(
            -1,
            0
          );
        }

        if (
          key === "arrowright" ||
          key === "d"
        ) {
          event.preventDefault();

          changeDirection(
            1,
            0
          );
        }
      }
    );

    snakeStart.addEventListener(
      "click",
      startSnake
    );

    drawSnake();
  }


  /* =========================================================
     RESUME PDF DOWNLOAD
     ========================================================= */

  document
    .querySelectorAll(
      'a[href$=".pdf"]'
    )
    .forEach(function (resumeLink) {
      resumeLink.setAttribute(
        "download",
        "SOUMYADEEP_DEY_Resume.pdf"
      );
    });


  /* =========================================================
     CONSOLE MESSAGE
     ========================================================= */

  console.log(
    "%cSoumyadeep Dey Portfolio",
    "font-size:20px;font-weight:bold;"
  );

  console.log(
    "Welcome to the Viewer Arcade!"
  );

})();
