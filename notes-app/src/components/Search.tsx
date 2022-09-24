import { useState } from "react";
import { MdSearch } from "react-icons/md";

interface ISearch {
  onSearch: (arr: number) => void;
}

function Search({ onSearch }: ISearch) {
  let val = localStorage.getItem("val") || "";

  const [str, setStr] = useState(val);
  localStorage.setItem("val", str);

  let def = localStorage.getItem("notesdef") || "[]";
  const allobjects = localStorage.getItem("seraching") || "[]";
  const elasticItems = JSON.parse(allobjects);
  const allobjectslength = elasticItems.length;

  if (str === "") {
    if (localStorage.getItem("notesdef") !== localStorage.getItem("notes")) {
      localStorage.setItem("notes", JSON.stringify(JSON.parse(def)));
      localStorage.setItem("reloud", "1");
    }

    if (localStorage.getItem("reloud") === "1") {
      localStorage.setItem("reloud", "0");
      onSearch(JSON.parse(def));
    }
  } else {
    localStorage.setItem("seraching", localStorage.getItem("notesdef") || "[]");

    for (let i = 0; i <= allobjectslength - 1; i++) {
      if (elasticItems[i].title.search(str) === -1) {
        if (elasticItems[i].content.search(str) === -1) {
          let id = elasticItems[i].id + "";

          const allobjectstodo = localStorage.getItem("TodoList" + id) || "[]";
          const elasticItemstodo = JSON.parse(allobjectstodo);
          const allobjectslengthtodo = elasticItemstodo.length;
          let arr = "f";

          for (let j = 0; j < allobjectslengthtodo; j++) {
            if (elasticItemstodo[j].text.search(str) === -1) {
              arr = arr + "false";
            } else {
              arr = arr + "true";
            }
          }

          if (arr?.search("true") === -1) {
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
        } else {
        }
      }
    }
    if (localStorage.getItem("reloud") === "1") {
      const arr = localStorage.getItem("notes") || "[]";
      const elarr = JSON.parse(arr);
      const arrlength = elarr.length;

      let arrcontent = [];
      let b = 0;
      let arrtitle = [];
      let c = 0;
      let arrtodo = [];
      let d = 0;
      for (let i = 0; i <= arrlength - 1; i++) {
        if (elarr[i].title.search(str) !== -1) {
          let title2 = elarr[i].title;
          let content2 = elarr[i].content;
          let date2 = elarr[i].date;
          let id2 = elarr[i].id;
          arrtitle[c] = {
            title: title2,
            content: content2,
            date: date2,
            id: id2,
          };
          c++;
        } else if (elarr[i].content.search(str) !== -1) {
          let title1 = elarr[i].title;
          let content1 = elarr[i].content;
          let date1 = elarr[i].date;
          let id1 = elarr[i].id;
          arrcontent[b] = {
            title: title1,
            content: content1,
            date: date1,
            id: id1,
          };
          b++;
        } else {
          let title3 = elarr[i].title;
          let content3 = elarr[i].content;
          let date3 = elarr[i].date;
          let id3 = elarr[i].id;
          arrtodo[d] = {
            title: title3,
            content: content3,
            date: date3,
            id: id3,
          };
          d++;
        }
      }

      let aarr = arrtitle.concat(arrcontent);
      let barr = aarr.concat(arrtodo);
      localStorage.setItem("notes", JSON.stringify(barr));
      onSearch(JSON.parse(localStorage.getItem("notes") || "[]"));

      localStorage.setItem("reloud", "0");
    }
  }

  return (
    <div className="search">
      <MdSearch className="searchIcons" />

      <input
        value={str}
        onChange={(e) => setStr(e.target.value)}
        type="text"
        placeholder="type to search..."
      ></input>
    </div>
  );
}

export default Search;
