type LoadingProps = {
  classString?: string;
};

export const Loading = ({ classString }: LoadingProps) => {
  const mergeClass =
    classString +
    "p-8 fixed size-full top-0 left-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-lg";

  return (
    <div className={mergeClass}>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
