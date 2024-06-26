"use client";

import { PromptCard } from "./PromptCard";
import { useEffect, useState } from "react";

export const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  // Search states
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt", {cache: "no-store"});
      const data = await response.json();
      setPosts(data)
    };
    fetchPosts();
  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input type="text" placeholder="search for a tag or username" value={searchText} onChange={handleSearchChange} className="search_input peer" required />
      </form>
      {searchText ? ( <PromptCardList data={searchedResults} handleTagClick={handleTagClick} /> ) : 
      ( <PromptCardList data={posts} handleTagClick={handleTagClick} /> )}
    </section>
  );
};


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      })}
    </div>
  )
}
