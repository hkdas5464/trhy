import { useState } from 'react';

const ManageFile = () => {
  const [selectedFile, setSelectedFile] = useState('file1'); // Default file
  const [data, setData] = useState([]); // Current file data
  const [newItem, setNewItem] = useState(''); // New item to add
  const [error, setError] = useState<string | null>(null); // Error handling

  // Fetch data for the selected file
  const fetchFileData = async () => {
    setError(null);
    try {
      const response = await fetch(`/data/${selectedFile}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${selectedFile}.json`);
      }
      const fileData = await response.json();
      setData(fileData);
    } catch (err: any) {
      console.error('Error fetching file data:', err);
      setError('Failed to fetch file data. Please try again.');
    }
  };

  // Update the selected file
  const updateFile = async () => {
    if (!newItem.trim()) return alert('Item name cannot be empty.');

    const updatedData = [...data, { id: data.length + 1, name: newItem }];
    setData(updatedData); // Update state locally
    setNewItem(''); // Clear input
    setError(null);

    try {
      const response = await fetch('/api/update-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: selectedFile, newData: updatedData }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${selectedFile}.json`);
      }
      alert(`${selectedFile}.json updated successfully!`);
    } catch (err: any) {
      console.error('Error updating file:', err);
      setError('Failed to update file. Please try again.');
    }
  };

  return (
    <div>
      <h1>Manage JSON Files</h1>

      {/* File Selection */}
      <div>
        <label>Select File: </label>
        <select value={selectedFile} onChange={(e) => setSelectedFile(e.target.value)}>
          <option value="file1">file1.json</option>
          <option value="file2">file2.json</option>
        </select>
        <button onClick={fetchFileData}>Load File</button>
      </div>

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display File Data */}
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      {/* Add New Item */}
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item name"
        />
        <button onClick={updateFile}>Add Item</button>
      </div>
    </div>
  );
};

export default ManageFile;
