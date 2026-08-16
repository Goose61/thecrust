const CA = "4AkCN6KLeCmUDjWLg4XyQpuZuWtwBdPcbtBQjsA2pump";

const poses = [
  {
    webp: "assets/dough_katana.webp",
    png: "assets/dough_katana.png",
    alt: "Dough Boi jumping with neon green katanas, red cap, dough body",
  },
  {
    webp: "assets/dough_boi.webp",
    png: "assets/dough_boi.png",
    alt: "Dough Boi waving, red cap with pixel pizza",
  },
  {
    webp: "assets/dough_boi2.webp",
    png: "assets/dough_boi2.png",
    alt: "Dough Boi holding an 8-bit pizza slice",
  },
  {
    webp: "assets/dough_surfer.webp",
    png: "assets/dough_surfer.png",
    alt: "Dough Boi surfing a melted-cheese wave, $PIZZA A Slice of Life",
  },
];

poses.forEach((pose) => {
  const img = new Image();
  img.src = pose.webp;
});

function flashCopied(button) {
  const label = button.querySelector(".ca-chip__label") || button;
  const original = label.textContent;
  button.classList.add("is-copied");
  label.textContent = "Copied";
  window.setTimeout(() => {
    button.classList.remove("is-copied");
    label.textContent = original;
  }, 1600);
}

async function copyCa(button) {
  try {
    await navigator.clipboard.writeText(CA);
    flashCopied(button);
  } catch {
    window.prompt("Copy contract", CA);
  }
}

document.querySelectorAll("[data-copy-ca]").forEach((button) => {
  button.addEventListener("click", () => copyCa(button));
});

const stage = document.getElementById("pose-stage");
const poseWebp = document.getElementById("pose-webp");
const poseImg = document.getElementById("pose-img");
let poseIndex = 0;

if (stage && poseImg) {
  stage.addEventListener("click", () => {
    poseIndex = (poseIndex + 1) % poses.length;
    const pose = poses[poseIndex];
    if (poseWebp) poseWebp.srcset = pose.webp;
    poseImg.src = pose.png;
    poseImg.alt = pose.alt;
  });
}

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav__toggle");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * 8;
      const tiltY = (x - 0.5) * 8;
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

const slash = document.querySelector(".slash");
if (slash) {
  slash.addEventListener("animationend", () => slash.remove());
}
