import { MdSearch } from "react-icons/md";

const Search = ({handleSearchNote}:any) => {
    return (<div className="search">
        <MdSearch className="search-icons" size='30' />
        <input
            onChange={(event) =>
                handleSearchNote(event.target.value)
        }
            type='text' placeholder="type to search...">
        </input>
    </div>
    );
};

export default Search;