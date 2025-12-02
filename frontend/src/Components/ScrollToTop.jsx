import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // If we have a targetId in state, DON'T scroll to top here.
    // Let the specific component (HomePage) handle the scrolling.
    if (state && state.targetId) {
      return; 
    }

    // Otherwise, always scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}
