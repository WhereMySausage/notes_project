import { useState } from "react";
import { MdSearch } from "react-icons/md";

const Search = (e: any) => {
  let val = localStorage.getItem("val") || "";

  const [str, setStr] = useState(val);
  localStorage.setItem("val", str);

  let def = localStorage.getItem("notesdef") || "[]";
  const allobjects = localStorage.getItem("seraching") || "[]";
  const elasticItems = JSON.parse(allobjects);
  const allobjectslength = elasticItems.length;

  if (str === "") {
    if (localStorage.getItem("notesdef") !== localStorage.getItem("notes")) {
      localStorage.setItem("reloud", "1");
    }

    localStorage.setItem("notes", JSON.stringify(JSON.parse(def)));

    if (localStorage.getItem("reloud") === "1") {
      localStorage.setItem("reloud", "0");

      window.location.reload();
    }
  } else {
    localStorage.setItem("seraching", localStorage.getItem("notesdef") || "[]");
    setInterval(() => {
      for (let i = 0; i <= allobjectslength - 1; i++) {
        if (elasticItems[i].title.search(str) === -1) {
          if (elasticItems[i].content.search(str) === -1) {
            const elasticItems1 = JSON.parse(
              localStorage.getItem("seraching") || "[]"
            );
            let filteredSearch = elasticItems1.filter(
              (notes: { id: string }) => notes.id !== elasticItems[i].id
            );
            let filteredNotes = elasticItems1.filter(
              (notes: { id: string }) => notes.id !== elasticItems[i].id
            );
            localStorage.setItem("notes", JSON.stringify(filteredNotes));
            localStorage.setItem("seraching", JSON.stringify(filteredSearch));
            localStorage.setItem("reloud", "1");
          }
        }
      }
      if (localStorage.getItem("reloud") === "1") {
        localStorage.setItem("reloud", "0");
        setInterval(() => {
          window.location.reload();
        }, 1000);
      }
    }, 100);
  }

  return (
    <div className="search">
      <MdSearch className="search-icons" size="30" />
      <input
        value={str}
        onChange={(e) => setStr(e.target.value)}
        type="text"
        placeholder="type to search..."
      ></input>
    </div>
  );
};

export default Search;
