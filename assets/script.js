const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    console.log('click')
    menu.classList.toggle("nav-active");
    menuBtn.classList.toggle("active");
});

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");

// Clone first & last slide dynamically
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
firstClone.classList.add("clone-first");
lastClone.classList.add("clone-last");

// Append cloned slides
track.insertBefore(lastClone, slides[0]);
track.appendChild(firstClone);

let index = 1;
let translateX = -100; // Start at first real slide
let maxTranslateX = -15* (slides.length + 1); // Prevents excessive scrolling

track.style.transform = `translateX(${translateX}vw)`;
updateActiveSlide(index);

function moveSlide() {
    index++;
    translateX -= 100;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(${translateX}vw)`;

    track.addEventListener("transitionend", () => {
        if (index === slides.length + 1) { // Reset when reaching clone
            index = 1;
            translateX = -100;
            track.style.transition = "none";
            track.style.transform = `translateX(${translateX}vw)`;
        }
        updateActiveSlide(index);
    });

    if (translateX <= maxTranslateX * 10) {
        index = 1;
        translateX = -100;
        track.style.transition = "none";
        track.style.transform = `translateX(${translateX}vw)`;
    }
}

function updateActiveSlide(index) {
    document.querySelectorAll(".slide").forEach(slide => slide.classList.remove("active"));
    document.querySelectorAll(".slide")[index].classList.add("active");
}

setInterval(moveSlide, 3000);
