import { ReactNode, useEffect, useRef } from "react";

import "./SmoothScroll.scss";
import useDimension from "../../hooks/useDimension";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
    // 1.
    const windowSize = useDimension();

    //2.
    const scrollingContainerRef = useRef<HTMLDivElement>(null!);

    // 3.
    const data = {
        ease: 0.1,
        current: 0,
        previous: 0,
        rounded: 0,
    };

    // 4.
    useEffect(() => {
        setBodyHeight();
    }, [windowSize.height]);

    const setBodyHeight = () => {
        document.body.style.height = `${scrollingContainerRef.current.getBoundingClientRect().height
            }px`;
    };

    const smoothScrollingHandler = () => {
        data.current = window.scrollY;
        data.previous += (data.current - data.previous) * data.ease;
        data.rounded = Math.round(data.previous * 100) / 100;

        scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;

        // Recursive call
        requestAnimationFrame(() => smoothScrollingHandler());
    };

    // 5.
    useEffect(() => {
        requestAnimationFrame(() => smoothScrollingHandler());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="parent">
            <div ref={scrollingContainerRef}>{children}</div>
        </div>
    );
};

export default SmoothScroll;
