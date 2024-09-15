import { useEffect, useState } from 'react';

const AddUserPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [message, setMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/customers/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User added:', result);
        setMessage('User added successfully!');
      } else {
        setMessage('Failed to add user. Please try again.'); 
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Failed to add user. Please try again.'); 
    }
  };

  return (
    <div>
      {message && (
        <div className="mb-4 p-4 text-white bg-green-500 rounded-md">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

const HomePage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/customers/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const showPop = () => setIsVisible(true);
  const hidePop = () => setIsVisible(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-3xl font-bold">User List</h1>
        <button 
          onClick={showPop}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img 
              src={'/images/user.jpg'} 
              alt={user.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
              <p className="text-gray-600">Phone: {user.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <AddUserPage />
              <button 
                onClick={hidePop}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
