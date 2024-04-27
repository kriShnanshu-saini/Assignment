import React, { useState } from 'react';
import { Select } from 'antd';

const TagFilter = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (selectedTags) => {
    setSelectedTags(selectedTags);
    // Update URL with selected tags
  };

  return (
    <Select
      mode="multiple"
      placeholder="Select tags"
      value={selectedTags}
      onChange={handleChange}
      style={{ width: '100%', marginBottom: '10px' }}
    >
      {/* Options will be populated dynamically */}
    </Select>
  );
};

export default TagFilter;
