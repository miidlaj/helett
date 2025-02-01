import type React from "react";

import { ProductTutorials } from "@/api/types";

interface TutorialVideosProps {
  tutorials: ProductTutorials[];
}

const TutorialVideos: React.FC<TutorialVideosProps> = ({ tutorials }) => {
  if (!tutorials || tutorials.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tutorials</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="h-[400px]">
            <iframe
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full h-full"
              frameBorder="0"
              src={`https://www.youtube.com/embed/${getYouTubeId(tutorial.link)}`}
              title="tutorial"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
}

export default TutorialVideos;
