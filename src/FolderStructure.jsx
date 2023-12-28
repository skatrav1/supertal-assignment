import React, { useState, useEffect } from 'react';
import folderData from './folderData.json';
import './FolderStructure.css';

const getFolderData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(folderData);
    }, 2000); // 2 secs delay
  });
};

// Component to display folders and files
const FolderComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = data.type === 'dir';

  const toggleFolder = () => isFolder && setIsOpen(!isOpen);

  return (
    <div style={{ marginLeft: 20 }}>
      <div onClick={toggleFolder}>
        {isFolder && (isOpen ? '[-] ' : '[+] ')}
        {data.file}
      </div>
      {isOpen && isFolder && data.contents.map((item, index) => (
        <FolderComponent key={index} data={item} />
      ))}
    </div>
  );
};

const FolderStructure = () => {
  const [folderData, setFolderData] = useState(null);

  useEffect(() => {
    getFolderData().then(data => {
      setFolderData(data);
    });
  }, []);

  return (
    <div className='folder-structure'>
      {folderData ? folderData.contents.map((item, index) => (
        <FolderComponent key={index} data={item} />
      )) : <div>Loading...</div>}
    </div>
  );
};

export default FolderStructure;
