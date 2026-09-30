import React, { useRef, useState, useEffect } from "react";

const AnimateOnScroll = ({
 children,
 animation = "fadeUp",
 delay = 0,
 threshold = 0.15,
 className = "",
 as: Tag = "div",
 ...rest
}) => {
 const ref = useRef(null);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 const el = ref.current;
 if (!el) return;

 const observer = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setIsVisible(true);
 observer.unobserve(el);
 }
 },
 { threshold }
 );

 observer.observe(el);
 return () => observer.disconnect();
 }, [threshold]);

 return (
 <Tag
 ref={ref}
 className={`${className} ${isVisible ? `animate-${animation}` : ""}`}
 style={isVisible ? { animationDelay: `${delay}ms` } : { opacity: 0 }}
 {...rest}
 >
 {children}
 </Tag>
 );
};

export default AnimateOnScroll;
