import { RefObject, useEffect, useState } from "react";

export const useOnScreen = (
  ref: RefObject<HTMLElement>,
  observerOptions?: IntersectionObserverInit
) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisibility(entry.isIntersecting);
    }, observerOptions);

    observer.observe(ref.current!);

    return () => observer.disconnect();
  }, [observerOptions, ref]);
  return isVisible;
};
