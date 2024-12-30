import fs from 'fs';
import path from 'path';

export default function handler(req:any, res:any) {
  if (req.method === 'POST') {
    const { fileName, newData } = req.body;

    if (!fileName || !newData) {
      return res.status(400).json({ error: 'File name and data are required' });
    }

    const filePath = path.join(process.cwd(), 'public', 'data', `${fileName}.json`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: `File ${fileName}.json not found` });
    }

    try {
      // Write the new data to the file
      fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
      return res.status(200).json({ message: `${fileName}.json updated successfully` });
    } catch (error) {
      console.error('Error writing to file:', error);
      return res.status(500).json({ error: 'Failed to update the file' });
    }
  } else {
    // Respond with "Method Not Allowed" for any other methods
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
