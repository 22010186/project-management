export const Loading = () => {
  return (
    <div className="p-8 fixed size-full top-0 left-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-lg">
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
