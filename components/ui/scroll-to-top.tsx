"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show scroll to top when scrolled down more than 300px
      setIsVisible(scrollTop > 300);

      // Show scroll to bottom when near the top but there's more content below
      setShowScrollDown(scrollTop < 100 && documentHeight > windowHeight * 2);
    };

    // Check initially
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      <Button
        aria-label="Scroll to top"
        className={cn(
          "fixed right-4 bottom-4 z-50 size-12 rounded-full shadow-lg transition-all duration-300",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        )}
        onClick={scrollToTop}
        size="icon"
        variant="default"
      >
        <ChevronUp className="size-5" />
      </Button>

      {/* Scroll to Bottom Button */}
      <Button
        aria-label="Scroll to bottom"
        className={cn(
          "fixed right-4 bottom-20 z-50 size-12 rounded-full shadow-lg transition-all duration-300",
          showScrollDown
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0",
        )}
        onClick={scrollToBottom}
        size="icon"
        variant="outline"
      >
        <ChevronDown className="size-5" />
      </Button>
    </>
  );
}
