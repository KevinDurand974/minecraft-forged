const ModpackRowLoading = () => {
  return (
    <div className="grid modpack-rows justify-between bg-tertiary border-2 border-transparent">
      <div>
        <div className="w-32 h-32 bg-secondary rounded-xl animate-pulse" />
      </div>
      <div className="p-4 max-h-32 overflow-hidden">
        <div className="mb-3 w-fit animate-pulse">
          <div className="w-96 h-6 bg-secondary rounded-3xl" />
        </div>
        <div className="max-h-[48px]">
          <div className="w-full h-4 mb-2 bg-secondary rounded-3xl animate-pulse animation-delay-200" />
          <div className="w-4/5 h-4 mb-2 bg-secondary rounded-3xl animate-pulse animation-delay-500" />
          <div className="w-1/2 h-4 bg-secondary rounded-3xl animate-pulse animation-delay-700" />
        </div>
      </div>
      <ul className="flex flex-col p-4 whitespace-nowrap justify-between text-lg text-right items-end h-full">
        <li>
          <div className="w-28 h-5 bg-secondary rounded-3xl animate-pulse" />
        </li>
        <li>
          <div className="w-28 h-5 bg-secondary rounded-3xl animate-pulse animation-delay-200" />
        </li>
        <li className="tracking-wider">
          <div className="w-28 h-5 bg-secondary rounded-3xl animate-pulse animation-delay-500" />
        </li>
      </ul>
      <div className="flex flex-col gap-1">
        <div className="h-1/2 bg-secondary rounded-xl animate-pulse" />
        <div className="h-1/2 bg-secondary rounded-xl animate-pulse animation-delay-200" />
      </div>
    </div>
  );
};

export default ModpackRowLoading;
