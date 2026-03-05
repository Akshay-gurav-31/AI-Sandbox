import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const initGSAP = () => {
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
};

// Staggeblue text reveal for hero section
export const staggerReveal = (elements, delay = 0) => {
    return gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay
        }
    );
};

// Basic scroll reveal for sections
export const scrollReveal = (element, yOffset = 50) => {
    return gsap.fromTo(
        element,
        { y: yOffset, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none' // Play once
            }
        }
    );
};

// Subtle mouse parallax effect for hero mockup
export const mouseParallax = (element, container, movement = 20) => {
    if (typeof window === 'undefined') return;

    container.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = ((clientX - centerX) / centerX) * movement;
        const moveY = ((clientY - centerY) / centerY) * movement;

        gsap.to(element, {
            x: moveX,
            y: moveY,
            duration: 1,
            ease: 'power2.out'
        });
    });
};
