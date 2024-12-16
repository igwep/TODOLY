import React,{useContext} from 'react'
import { LoadingContext} from '../context/LoadingContext'

const SearchPage = () => {
const {query, filteredTasks, setFilteredTasks,  showSearchResult} = useContext(LoadingContext)
  return (
    <div className='tablet:pl-[25vw] pt-32 py-8 h-screen bg-gray-100 px-8 w-[100%]'>
    <ul className="results-list">
      {query.length === 0 ? (
        // Case: Search field is empty
        ''
      ) : filteredTasks.length > 0 ? (
        // Case: Matches found
        filteredTasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))
      ) : (
        // Case: No matches found
        <p className='tablet:pl-[25vw] pt-32 py-8 bg-gray-100 px-8 w-[100%]'>
          No results found.
        </p>
      )}
    </ul>
  </div>
  )
}

export default SearchPage