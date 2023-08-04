import { useState } from "react";
import Pagination from "./Pagination";
interface UploadedImage {
  extension?: string;
  fileName?: string;
  publicId?: string;
  photoURL: string;
}
type MasonryGridProps = {
  uploadedImages: UploadedImage[];
};
const MasonryGrid: React.FC<MasonryGridProps> = ({ uploadedImages }) => {
  const numPages = Math.ceil(uploadedImages.length / 6);

  // console.log(numPages, "numPages");
  const [currentPage, setCurrentPage] = useState(0);
  const groupImages = (images: UploadedImage[], groupSize: number) => {
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
            {group.map(({ photoURL }, imageIndex: number) => (
              <div key={imageIndex} className="aspect-w-1 aspect-h-1">
                <figure className="w-full h-full">
                  <a href={photoURL} target="_blank" rel="noopener noreferrer">
                    <img
                      className="object-cover w-full h-full rounded-lg"
                      src={photoURL}
                      alt={`Image ${groupIndex * 3 + imageIndex + 1}`}
                    />
                  </a>
                </figure>
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
