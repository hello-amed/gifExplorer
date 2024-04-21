import React from "react";

interface SkeletonProps {
  count: number;
  width?: string;
  height?: string;
}

const SkeletonItem: React.FC<{ width: string; height: string }> = ({
  width,
  height,
}) => <div className={`skeleton ${width} ${height} m-2`}></div>;

const SkeletonLoader: React.FC<SkeletonProps> = ({
  count,
  width = "w-40",
  height = "h-40",
}) => {
  const skeletonItems = Array.from({ length: count }, (_, index) => (
    <SkeletonItem key={index} width={width} height={height} />
  ));

  return (
    <div className="card-wrapper">
      <div className="card-gallery">{skeletonItems}</div>
    </div>
  );
};

export default SkeletonLoader;
