export const menuSlide = {
    initial: {
        x: "calc(-100%)",
        opacity: 0 // Commence à 0 (transparent)
    },
    enter: {
        x: "0",
        opacity: 1, // Devient complètement visible
        transition: {
            x: { duration: 0.2, ease: "linear" }, // Animation du déplacement
            opacity: { duration: 0.2, ease: "linear" } // Animation de l'opacité
        }
    },
    exit: {
        x: "calc(-100%)",
        opacity: 0, // Devient transparent
        transition: {
            x: { duration: 0.2, ease: "linear" }, // Animation du déplacement
            opacity: { duration: 0.2, ease: "linear" } // Animation de l'opacité
        }
    }
}


export const slideLink = {
    initial: { opacity: 0 },
    enter: (i: number) => ({ opacity: 1, transition: { duration: 0.8, ease: "linear", delay: 0.05 * i } }),
    exit: (i: number) => ({ opacity: 0, transition: { duration: 0.8, ease: "linear", delay: 0.05 * i } })
}