export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  
    const { username, password } = req.body;
  
    
    if (username === 'samuel' && password === '1234') {
      return res.status(200).json({ success: true, username });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  }
  