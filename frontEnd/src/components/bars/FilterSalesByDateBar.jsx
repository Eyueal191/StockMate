import React, { useContext } from "react";
import { StockContext } from "../../stockContext/StockContext.jsx";
// Removed unused imports: X, Filter

function FilterSalesByDateBar() {
  const { upperDate, lowerDate, setUpperDate, setLowerDate } = useContext(StockContext);

  const applyFilter = (e) => {
    e.preventDefault();
    // Logic: Trigger sales data fetch with (lowerDate, upperDate)
  };

  const clearDates = (e) => {
    e.preventDefault();
    setLowerDate("");
    setUpperDate("");
    // Logic: Reset data view to show all records
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full bg-white p-4 rounded-xl shadow-lg border border-gray-100">
      
      {/* ## Main Title (Increased Scaling and Weight) */}
      {/* Font Scale: text-xl (default/mobile) -> md:text-2xl (tablet) -> lg:text-3xl (desktop) */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 w-full pb-2 border-b border-gray-200 flex items-center gap-2"> 
          <span className="inline-block animate-bounce-slow">📅</span>
          <span>Filter Sale Records by Date Range</span>
      </h2>
      
      {/* --- */}

      {/* 📱 Mobile Layout: < md (Stacked Inputs & Buttons, Full Width) */}
      <div className="w-full md:hidden">
         <form onSubmit={applyFilter} className="flex flex-col gap-4">
           
           {/* FROM Date Input (w-full) - Added colon */}
           <label htmlFor="sm-lowerDate" className="flex flex-col gap-1 w-full text-sm font-medium text-gray-900">
             From Date:
             <input 
               id="sm-lowerDate"
               type="date" 
               value={lowerDate} 
               onChange={(e) => setLowerDate(e.target.value)}
               className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
             />
           </label>
           
           {/* TO Date Input (w-full) - Added colon */}
           <label htmlFor="sm-upperDate" className="flex flex-col gap-1 w-full text-sm font-medium text-gray-900">
             To Date:
             <input 
               id="sm-upperDate"
               type="date" 
               value={upperDate} 
               onChange={(e) => setUpperDate(e.target.value)}
               className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
             />
           </label>

           {/* Buttons (Stacked - w-full) */}
           <div className="flex flex-col gap-3 mt-2"> 
             <button 
                 type="submit" 
                 className="w-full flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 font-semibold text-sm h-10"
             >
                 Filter
             </button>
             <button 
                 type="button" 
                 onClick={clearDates} 
                 className="w-full flex items-center justify-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 font-semibold text-sm h-10"
             >
                 Clear
             </button>
           </div>
         </form>
      </div>
      
      {/* --- */}

      {/* 💻 Tablet Layout: md to < lg (Inline Fixed-Width Inputs, Stacked Fixed-Width Buttons) */}
      <div className="hidden md:flex lg:hidden w-full items-start justify-between">
         <form onSubmit={applyFilter} className="flex flex-col w-full gap-3">
            
           {/* Inputs (Inline with fixed width inputs: w-40) */}
           <div className="flex gap-4 w-full">
               {/* FROM Date Input - Added colon */}
               <label htmlFor="md-lowerDate" className="flex flex-col gap-1 w-40 text-sm font-medium text-gray-900">
                 From Date:
                 <input 
                   id="md-lowerDate"
                   type="date" 
                   value={lowerDate} 
                   onChange={(e) => setLowerDate(e.target.value)}
                   className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                 />
               </label>
               {/* TO Date Input - Added colon */}
               <label htmlFor="md-upperDate" className="flex flex-col gap-1 w-40 text-sm font-medium text-gray-900">
                 To Date:
                 <input 
                   id="md-upperDate"
                   type="date" 
                   value={upperDate} 
                   onChange={(e) => setUpperDate(e.target.value)}
                   className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                 />
               </label>
           </div>

           {/* Buttons (Stacked - fixed width: w-20) */}
           <div className="flex flex-col gap-3 mt-2"> 
             <button 
                 type="submit" 
                 className="w-20 flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 font-semibold text-sm h-10"
             >
                 Filter
             </button>
             <button 
                 type="button" 
                 onClick={clearDates} 
                 className="w-20 flex items-center justify-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 font-semibold text-sm h-10"
             >
                 Clear
             </button>
           </div>
         </form>
      </div>

      {/* --- */}

      {/* 🖥️ Desktop Layout: > lg (Inline Fixed-Width Inputs and Buttons) */}
      <div className="hidden lg:flex w-full items-end justify-between">
          <form onSubmit={applyFilter} className="flex flex-1 gap-4 items-end">
            
            {/* Inputs (Inline with fixed width inputs: w-40) */}
            <div className="flex gap-4 flex-grow">
                {/* FROM Date Input - Added colon */}
                <label htmlFor="lg-lowerDate" className="flex flex-col gap-1 w-40 text-sm font-medium text-gray-900">
                  From Date:
                  <input 
                    id="lg-lowerDate"
                    type="date" 
                    value={lowerDate} 
                    onChange={(e) => setLowerDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  />
                </label>
                {/* TO Date Input - Added colon */}
                <label htmlFor="lg-upperDate" className="flex flex-col gap-1 w-40 text-sm font-medium text-gray-900">
                  To Date:
                  <input 
                    id="lg-upperDate"
                    type="date" 
                    value={upperDate} 
                    onChange={(e) => setUpperDate(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                  />
                </label>
            </div>

            {/* Buttons (Inline - fixed width: w-20) */}
            <div className="flex gap-3">
              <button 
                  type="submit" 
                  className="w-20 flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 font-semibold text-sm h-10"
              >
                  Filter
              </button>
              <button 
                  type="button" 
                  onClick={clearDates} 
                  className="w-20 flex items-center justify-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-150 font-semibold text-sm h-10"
              >
                  Clear
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}
export default FilterSalesByDateBar;