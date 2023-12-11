import { useEffect, useState } from 'react';

function useSkeleton(isDataLoading) {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [skeletonEverBeenShown, setSkeletonEverBeenShown] = useState(false);

  useEffect(() => {
    if (isDataLoading && !skeletonEverBeenShown) {
      setShowSkeleton(true);
      setSkeletonEverBeenShown(true);
    }

    if (!isDataLoading) {
      setShowSkeleton(false);
    }
  }, [isDataLoading, skeletonEverBeenShown]);

  return { showSkeleton };
}

export default useSkeleton;
