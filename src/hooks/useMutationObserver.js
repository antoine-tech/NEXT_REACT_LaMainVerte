import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const useMutationObserver = (
  rootContainer = "#wall",
  observedCssSelector = ".card-garden"
) => {
  const [viewedItem, setviewedItem] = useState(null);
  const [viewedItems, setViewedItems] = useState([]);

  const observerCallback = (intersectionObjList) => {
    intersectionObjList.forEach((element) => {
      if (element.intersectionRatio > 0) {
        setviewedItem(element.target.id);
      }
    });
  };

  const observerOptions = {
    root: document.querySelector(rootContainer),
    threshold: 1.0,
  };

  const intersectionObserver = useRef(
    new IntersectionObserver(observerCallback)
  );

  useEffect(() => {
    if (
      viewedItem &&
      viewedItems.find((element) => element == viewedItem) === undefined
    ) {
      setViewedItems([...viewedItems, viewedItem]);
    }
  }, [viewedItem]);

  useEffect(() => {
    Array.from(document.querySelectorAll(observedCssSelector)).forEach(
      (element) => {
        intersectionObserver.current.observe(element, observerOptions);
      }
    );
  });

  return viewedItems;
};

export default useMutationObserver;
