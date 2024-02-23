import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "boxicons/css/boxicons.min.css";

gsap.registerPlugin(ScrollTrigger);

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
                if (section.classList.contains("skills")) {
                    // add the progess bar animation for section "skills"
                    gsap.from(progressBars, {
                        width: 0,
                        opacity: 0,
                        duration: 2,
                        ease: "elastic.out(1,0.8)",
                        stagger: 0.2,
                        onStart: () => {
                            progressBars.forEach((progressBar) => {
                                // make the progress bars visible once the animation starts
                                progressBar.classList.add("bar-active");
                            });
                        },
                    });
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
})


// start header animation
const headerSection = {
    section: animateSections[0],
    title: animateSections[0].querySelector(".home-content h1"),
    subtitle: animateSections[0].querySelector(".home-content p"),
    buttons: animateSections[0].querySelector(".home-content .btn-box"),
    image: animateSections[0].querySelector("img"),
    socials: animateSections[0].querySelector(".home-sci"),
}


// Define the initial positions
const initialPositions = {
    section: { scale: 1.2 },
    title: { x: -100, opacity: 0 },
    subtitle: { x: -100, opacity: 0 },
    buttons: { x: -100, opacity: 0 },
    socials: { y: 100, opacity: 0 },
    image: { x: window.innerWidth < 991 ? 0 : 100, opacity: 0 },
};

// Initialize GSAP Timeline
const tl = gsap.timeline();

// Set initial positions
tl.set(headerSection.section, { scale: initialPositions.section.scale });
tl.set(headerSection.title, { x: initialPositions.title.x, opacity: initialPositions.title.opacity });
tl.set(headerSection.subtitle, { x: initialPositions.subtitle.x, opacity: initialPositions.subtitle.opacity });
tl.set(headerSection.buttons, { x: initialPositions.buttons.x, opacity: initialPositions.buttons.opacity });
tl.set(headerSection.socials, { y: initialPositions.socials.y, opacity: initialPositions.socials.opacity });
tl.set(headerSection.image, { x: initialPositions.image.x, opacity: initialPositions.image.opacity });

// Animation with staggered timings
tl.to(headerSection.title, { x: 0, opacity: 1, duration: 1, ease: "power2.out" });
tl.to(headerSection.image, { x: 0, opacity: 1, duration: window.innerWidth < 991 ? 3 : 1, ease: "power2.out" }, "-=0.8");
tl.to(headerSection.subtitle, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, window.innerWidth < 991 ? "-=2.8" : "-=0.8");
tl.to(headerSection.buttons, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, window.innerWidth < 991 ? "-=2.8" : "-=0.8");
tl.to(headerSection.socials, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, window.innerWidth < 991 ? "-=2.8" : "-=0.8");
tl.to(headerSection.section, { scale: 1, duration: 2, ease: "power1.out" }, window.innerWidth < 991 ? "-=3.7" : "-=1.7");