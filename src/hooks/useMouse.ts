import { useEffect, useState } from "react";

export default function useMouse() {
    const [mouse, setMouse] = useState({ x: 150, y: 150, pixelRatio: 0 });

    const mouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        setMouse({
            x: clientX,
            y: clientY,
            pixelRatio: Math.min(window.devicePixelRatio, 2),
        });
    };

    useEffect(() => {
        window.addEventListener("mousemove", mouseMove);
        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return mouse;
}
