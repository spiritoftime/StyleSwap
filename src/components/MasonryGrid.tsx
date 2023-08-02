import React from "react";

const MasonryGrid = ({ uploadedImages }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {uploadedImages.map((uploadedImage) => {
        const groupImages = (images, groupSize) => {
          const grouped = [];
          for (let i = 0; i < images.length; i += groupSize) {
            grouped.push(images.slice(i, i + groupSize));
          }
          return grouped;
        };

        // Group the uploadedImages into arrays of three images each
        const imagesInGroupsOfThree = groupImages(uploadedImages, 3);
        for (const group of imagesInGroupsOfThree) {
          return (
            <div className="grid gap-4">
              {group.map(({ photoURL }) => (
                <img
                  className="h-auto max-w-full rounded-lg"
                  src={photoURL}
                  alt=""
                />
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MasonryGrid;
