import React, { useState } from "react";
import Pagination from "./Pagination";

const MasonryGrid = ({ uploadedImages }) => {
  const [numPages, setNumPages] = useState(
    Math.ceil(uploadedImages.length / 6)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const groupImages = (images, groupSize) => {
    const grouped = [];
    for (let i = 0; i < images.length; i += groupSize) {
      grouped.push(images.slice(i, i + groupSize));
    }
    return grouped;
  };
  // Group the uploadedImages into arrays of three images each
  const imagesInGroupsOfThree = groupImages(uploadedImages, 3);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {imagesInGroupsOfThree.map((group, groupIndex) => (
          <div key={groupIndex} className="grid gap-4">
            {group.map(({ photoURL }, imageIndex) => (
              <div className="aspect-w-1 aspect-h-1">
                <img
                  key={imageIndex}
                  className="object-cover w-full h-full rounded-lg"
                  src={photoURL}
                  alt={`Image ${groupIndex * 3 + imageIndex + 1}`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <Pagination
        numPages={numPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default MasonryGrid;
