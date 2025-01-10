import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function useMouseMotion() {
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0),
    };


    const mouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX);
        mouse.y.set(clientY);
    };

    useEffect(() => {
        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return mouse;
}