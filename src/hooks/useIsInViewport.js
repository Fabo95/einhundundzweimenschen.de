import {useEffect, useMemo, useState} from "react"

export default function useIsInViewport(ref) {

    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) => {  
        /* entry.isIntersecting ist true oder false je nachdem, ob ref.current im Viewport ist 
        HINT: "isIntersecting" ist hier einmal der State-wert aber AUCH eine property im entry-Objekt 
        */
        if (entry.isIntersecting) {
          setIsIntersecting(true)}
        }
        ),
      [],
    );

    useEffect(() => {
      observer.observe(ref.current);
  
      return () => {
        observer.disconnect();
      };
    }, [ref, observer]);
  
    return isIntersecting;
  }