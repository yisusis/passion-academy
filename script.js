// Initialize AOS
AOS.init({ duration:1000, once:false });

// Animated Counter
const counters = document.querySelectorAll('.stat h3');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+','');
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + (counter.getAttribute('data-target').includes('+') ? '+' : '');
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.getAttribute('data-target').includes('+') ? '+' : '');
            }
        };
        updateCount();
    });
};

// Start counters when section visible
window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats');
    if (!section) return;
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    if (sectionPos < screenPos) startCounters();
}, { once:true });

// Slideshow Gallery
let slideIndex = 0;
showSlides();
function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i=0;i<slides.length;i++){ slides[i].style.display="none"; }
    slideIndex++;
    if(slideIndex>slides.length){slideIndex=1;}
    slides[slideIndex-1].style.display="block";
    setTimeout(showSlides, 3000);
}