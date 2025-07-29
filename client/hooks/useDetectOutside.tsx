import React, { useEffect } from "react";

interface DetectOutsideProps {
  ref: React.RefObject<HTMLDivElement | null>;
  callback: () => void;
}

function useDetectOutside({ ref, callback }: DetectOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
  return <div>Outside</div>;
}

export default useDetectOutside;
