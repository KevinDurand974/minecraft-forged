const ModpackTileLoading = () => {
  return (
    <div className="bg-tertiary h-48 w-48 m-auto relative ">
      <h3 className="absolute bottom-0 left-0 p-2 z-10 bg-black bg-opacity-100 w-full">
        <div className="h-5 w-4/5 bg-secondary rounded-xl animate-pulse" />
      </h3>
      <div className="absolute w-full h-full text-[150px] flex">
        <div className="h-full w-full m-2 bg-secondary rounded-xl animate-pulse animation-delay-200" />
      </div>
    </div>
  );
};

export default ModpackTileLoading;
