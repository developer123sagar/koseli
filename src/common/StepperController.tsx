const StepperController = () => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      <button className="bg-white text-slate-300 uppercase py-2 px-4 rounded-md font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out">
        Back
      </button>

      <button className="bg-white text-green-300 uppercase py-2 px-4 rounded-md font-semibold cursor-pointer border-2 border-slate-200 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out">
        Next
      </button>
    </div>
  );
};

export default StepperController;
