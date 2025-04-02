
export function Search() {
  return (
    <div className='flex flex-col items-center h-screen'>
      <div className="flex items-center justify-center h-[3rem] w-[25rem] mt-[5rem] bg-[#b9b9b9] rounded-lg ">
	  <textarea
      id="search"
      rows={1}
      className=" rounded px-2.4 py-1.6 resize-none w-full"
      placeholder="   Pesquisar"
    />
		<div className="flex mr-4 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
		</div>
      </div>
    </div>
  )
}
