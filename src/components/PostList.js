import React, { useState, useEffect } from "react";
import { Table, Input, Tag } from "antd";
import PaginationComponent from "./PaginationComponent"; // Import PaginationComponent
// import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
const { Search } = Input;
const PostList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Number of items per page
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const tagsArr = new Set();
  const allTags = () => {
    posts.forEach((post) => {
      post.tags.map((tag) => tagsArr.add(tag));
    });
    console.log([...tagsArr]);
  };

  useEffect(() => {
    const queryParams = queryString.parse(location.search);

    // Set current page from query parameters
    if (queryParams.page) {
      setCurrentPage(parseInt(queryParams.page));
    }

    // Set search query from query parameters
    if (queryParams.q) {
      setSearchQuery(queryParams.q);
    }
  }, [location.search]);

  useEffect(() => {
    // Fetch total number of items for pagination
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Filter posts based on search query
        const filteredPosts = searchQuery
          ? data.posts.filter((post) =>
              post.body.toLowerCase().includes(searchQuery.toLowerCase())
            ).length
          : data.total;
        setTotalItems(filteredPosts);
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
  allTags();

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
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.tags.indexOf(value) !== -1, // returns boolean value
      filters: [...tagsArr].map((tag) => {
        return {
          text: tag[0].toUpperCase() + tag.substring(1).toLowerCase(),
          value: tag,
        };
      }),
    },
    // Add more columns as needed
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURLParams({ page });
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    // Reset to first page when searching
    console.log(!value);
    if (!value) {
      console.log("h");
      updateURLParams({ page: 1 });
    } else updateURLParams({ page: 1, q: e.target.value });
  };

  const updateURLParams = (params) => {
    console.log(queryString.parse(location.search));
    console.log(params);
    const newParams = params.q
      ? {
          ...queryString.parse(location.search),
          ...params,
        }
      : params;
    console.log(newParams);
    const newQueryString = queryString.stringify(newParams);
    navigate(`${location.pathname}?${newQueryString}`);
  };

  return (
    <div>
      <h2>Post List</h2>
      <Search
        placeholder="Search posts"
        onChange={handleSearchChange}
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
