import gsap from "gsap";
import { ScrollTrigger, TextPlugin } from "gsap/all";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

import "boxicons/css/boxicons.min.css";

gsap.registerPlugin(ScrollTrigger, TextPlugin);
Splitting();

// toggle mobile navar
let menuIcon: HTMLElement = document.querySelector("#menu-icon") as HTMLElement;
let navbar: HTMLElement = document.querySelector(".navbar") as HTMLElement;
menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

// handle color of nav items depending on the section we're
let sections = document.querySelectorAll("section") as NodeListOf<HTMLElement>;
let navLinks = document.querySelectorAll("header nav a") as NodeListOf<HTMLElement>;
window.onscroll = () => {
    // check for each section if its in viewport
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        // if in viewport, color the nav item with the id in href and remove the color of all of them
        if (top >= offset && top < offset + height) {
            navLinks.forEach((links) => {
                // we add and remove the class very often, not ideal
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]")?.classList.add("active");
            });
        }
    });

    // sticky header
    let header = document.querySelector("header") as HTMLElement;
    // toggle "sticky" class if we scroll past +100px to the top
    header.classList.toggle("sticky", window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

// get Sections and ProgressBars
const animateSections: HTMLElement[] = gsap.utils.toArray("section");
const progressBars: NodeListOf<HTMLElement> = document.querySelectorAll(".progress .bar span");
const educationContents: NodeListOf<HTMLElement> = document.querySelectorAll(".education-content");
const educationBox: HTMLElement = document.querySelector(".education-box") as HTMLElement;

class ProgressBar {
    private progressBar: HTMLElement;
    private progressText: HTMLElement;
    private percent: number;

    constructor(progressBarElement: HTMLElement) {
        if (!progressBarElement) {
            throw new Error("ProgressBar element not found");
        }
        const startPercent = this.percentwidthfifth(progressBarElement);
        this.progressBar = progressBarElement as HTMLElement;
        this.progressText = this.progressBar.parentElement?.parentElement?.querySelector("h3 span") as HTMLElement;
        if(!this.progressText) {
            throw new Error("ProgressText not found")
        }
        console.log(this.progressText)
        this.percent = startPercent; // Initialize with startPercent or default to 0
        this.updateProgress(startPercent); // Initialize the progress bar and text
    }

    updateProgress(newPercent: number): void {
        // Update the internal percent value
        this.percent = newPercent;

        // // Animate the progress bar width
        // gsap.to(this.progressBar, {
        //     duration: 1, // Duration in seconds
        //     width: this.percent + "%", // Animate width to the new percent
        //     ease: "linear", // You can customize the easing function
        // });
        console.log(newPercent)
        gsap.from(this.progressBar, {
            width: 0,
            opacity: 0,
            duration: 2,
            ease: this.percent > 75 ? "elastic.out(1,1)" : "elastic.out(1,0.8)",
            stagger: 0.2,
            onStart: () => {
                this.progressBar.classList.add("bar-active");
            },
            onUpdate: () => {
                this.progressText.innerHTML = this.percentwidth(this.progressBar).toString() + "%";
            },
            onComplete: () => {
                this.progressText.innerHTML = this.percentwidthfifth(this.progressBar).toString() + "%";
            }
        });

        // Animate the percentage text
        // if (this.progressText) {
        //     gsap.to(this.progressText, {
        //         duration: 1, // Match duration for synchronized animation
        //         text: this.percent + "%", // Animate text to the new percent
        //         ease: "linear", // Match easing function for consistency
        //         snap: { text: 1 }, // Optional: snap to whole numbers
        //     });
        // }
    }

    percentwidthfifth(elem: HTMLElement): number {
        var pa: HTMLElement = elem.parentElement || elem;
        const percentValue = ((elem.offsetWidth/(pa.offsetWidth - 10))*100)
        return Math.ceil(percentValue / 5) * 5;
    }

    percentwidth(elem: HTMLElement): number {
        var pa: HTMLElement = elem.parentElement || elem;
        return Math.round(((elem.offsetWidth/(pa.offsetWidth - 10))*100));
    }
}
// create a gsap animation for each section
animateSections.forEach((section: HTMLElement) => {
    // skip the first section
    if (section !== animateSections[0]) {
        gsap.from(section, {
            opacity: 0,
            y: 200,
            duration: 0.5,
            scrollTrigger: {
                trigger: section,
                start: "top 50%",
            },
            onStart: () => {
                console.log("hello world")
                if (section.classList.contains("skills")) {
                    // add the progess bar animation for section "skills"
                    console.log("hi")
                    progressBars.forEach((progressBar) => {
                        const thisProgressBar = new ProgressBar(progressBar)
                        console.log(thisProgressBar)    
                    })
                    
                } else if (section.classList.contains("education")) {
                    // add the education contents animation for section "education"
                    gsap.from(educationContents, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in",
                        stagger: 0.1,
                        onStart: () => {
                            educationContents.forEach((progressBar) => {
                                // make the education contents visible once the animation starts
                                progressBar.classList.add("content-active");
                            });
                        },
                    });
                }
            },
        });
    }
});

// start header animation
const headerSection = {
    section: animateSections[0],
    title: animateSections[0].querySelector(".home-content h1"),
    subtitle: animateSections[0].querySelector(".home-content p"),
    buttons: animateSections[0].querySelector(".home-content .btn-box"),
    image: animateSections[0].querySelector("img"),
};

// Define the initial positions
const initialPositions = {
    section: { scale: 1.2 },
    title: { x: -100, opacity: 0 },
    subtitle: { x: -100, opacity: 0 },
    buttons: { x: -100, opacity: 0 },
    image: { x: window.innerWidth < 991 ? 0 : 100, opacity: 0 },
};

// Initialize GSAP Timeline
const tl = gsap.timeline();

// Set initial positions
tl.set(headerSection.section, { scale: initialPositions.section.scale });
tl.set(headerSection.title, { x: initialPositions.title.x, opacity: initialPositions.title.opacity });
tl.set(headerSection.subtitle, { x: initialPositions.subtitle.x, opacity: initialPositions.subtitle.opacity });
tl.set(headerSection.buttons, { x: initialPositions.buttons.x, opacity: initialPositions.buttons.opacity });
tl.set(headerSection.image, { x: initialPositions.image.x, opacity: initialPositions.image.opacity });

// Animation with staggered timings
tl.to(headerSection.title, { x: 0, opacity: 1, duration: 1, ease: "power2.out" });
tl.to(headerSection.image, { x: 0, opacity: 1, duration: window.innerWidth < 991 ? 3 : 1, ease: "power2.out" }, "-=0.8");
tl.to(headerSection.subtitle, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, window.innerWidth < 991 ? "-=2.8" : "-=0.8");
tl.to(headerSection.buttons, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, window.innerWidth < 991 ? "-=2.8" : "-=0.8");
tl.to(headerSection.section, { scale: 1, duration: 2, ease: "power1.out" }, window.innerWidth < 991 ? "-=3.7" : "-=1.7");

// head name animation

const nameChars = document.querySelectorAll(".char");
setInterval(function () {
    gsap.to(nameChars, {
        y: -20,
        color: "#46caff",
        duration: 0.2,
        stagger: 0.03,
    });
    gsap.to(nameChars, {
        y: 0,
        color: "#00abf0",
        duration: 0.5,
        stagger: 0.03,
        delay: 0.2,
    });
}, 2000);

// head hand wave animation

const waveHand = document.querySelector("#home-wave") as HTMLElement;
const emojis = ["🙃", "😏", "😍", "😇", "✨", "👀"]; // Array of emojis
let emojiIndex = 0;
let isFirstWave = true;

setInterval(function () {
    let isTurningEmoji = false;
    if (!isFirstWave) {
        const newEmoji = chooseEmoji();
        if (newEmoji === "🙃") {
            isTurningEmoji = true;
        }
        waveHand.textContent = newEmoji;
    }
    gsap.to(waveHand, {
        rotate: -20,
        scale: 1.3,
        duration: 0.2,
    });
    gsap.to(waveHand, {
        rotate: 20,
        duration: 0.2,
        delay: 0.2,
    });
    gsap.to(waveHand, {
        rotate: -20,
        duration: 0.2,
        delay: 0.4,
    });
    gsap.to(waveHand, {
        rotate: isTurningEmoji === false ? 20 : -180,
        duration: isTurningEmoji === false ? 0.2 : 1,
        delay: 0.6,
    });
    gsap.to(waveHand, {
        rotate: isTurningEmoji === false ? 0 : -180,
        scale: 1,
        duration: 0.2,
        delay: isTurningEmoji === false ? 0.8 : 1.2,
    });
    isFirstWave = false;
}, 3200);

function chooseEmoji() {
    if (emojiIndex >= emojis.length) {
        console.log("resetted emojiindex");
        emojiIndex = 1;
    } else {
        emojiIndex++;
    }

    return emojis[emojiIndex - 1];
}
