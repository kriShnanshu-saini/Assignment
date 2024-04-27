import React, { useState, useEffect } from "react";
import { Table, Input, Tag } from "antd";
import PaginationComponent from "./PaginationComponent"; // Import PaginationComponent
// import SearchBar from "./SearchBar";
const { Search } = Input;
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch total number of items for pagination
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Filter posts based on search query
        const filteredPosts = searchQuery
          ? data.posts.filter((post) =>
              post.body.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : setTotalItems(data.total);
        if (searchQuery) {
          setTotalItems(filteredPosts ? filteredPosts.length : 0);
        }
      });

    // Fetch data from API based on current page and page size
    fetch(
      `https://dummyjson.com/posts?skip=${
        (currentPage - 1) * pageSize
      }&limit=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Filter posts based on search query
        const filteredPosts = searchQuery
          ? data.posts.filter((post) =>
              post.body.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : data.posts;
        setPosts(filteredPosts);
      });
  }, [currentPage, pageSize, searchQuery]);

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Body", dataIndex: "body", key: "body" },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      ),
    },
    // Add more columns as needed
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearch = (value) => {
    setSearchQuery(value);
    console.log(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div>
      <h2>Post List</h2>
      <Search
        placeholder="Search posts"
        onSearch={handleSearch}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table columns={columns} dataSource={posts} pagination={false} />
      <PaginationComponent
        total={totalItems}
        pageSize={pageSize}
        onChange={handlePageChange}
        current={currentPage}
      />{" "}
      {/* Render PaginationComponent */}
    </div>
  );
};

export default PostList;
