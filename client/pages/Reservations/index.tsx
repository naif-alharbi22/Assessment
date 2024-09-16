import { useEffect, useState } from 'react';

interface Customer {
  id: number;
  name: string;
  phone: string;
}

interface Room {
  id: number;
  name: string;
  night_price: number;
}

interface Reservation {
  id: number;
  start_date: string;
  end_date: string;
  total_price: string;
  checked_in?: string;
  checked_out?: string;
  customer: Customer;
  room: Room;
}

const ReservationPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | undefined>(undefined);
  const [selectedRoom, setSelectedRoom] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [checkedIn, setCheckedIn] = useState<string | null>(null);
  const [checkedOut, setCheckedOut] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/customers/')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));

    fetch('http://127.0.0.1:8000/api/v1/rooms/')
      .then(response => response.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  const calculateTotalPrice = () => {
    if (!startDate || !endDate || !selectedRoom) return;

    const room = rooms.find(r => r.id === selectedRoom);
    if (!room) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff > 0) {
      const total = dayDiff * room.night_price;
      setTotalPrice(total.toFixed(2));
    } else {
      setTotalPrice('');
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [startDate, endDate, selectedRoom]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !selectedRoom) {
      setMessage('Please select a customer and room.');
      return;
    }
    setIsLoading(true);

    const payload = {
      customer: selectedCustomer,
      room: selectedRoom, 
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
      checked_in: checkedIn || null,
      checked_out: checkedOut || null,
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/WriteReservations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Reservation added:', result);
        setMessage('Reservation added successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to add reservation:', errorData);
        setMessage('Failed to add reservation. Please try again.');
      }
    } catch (error) {
      console.error('Error adding reservation:', error);
      setMessage('Failed to add reservation. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      {message && (
        <div className="mb-4 p-4 text-white bg-green-500 rounded-md">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Select Customer:</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select a customer</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name} (Phone: {customer.phone})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Select Room:</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select a room</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>
                Room {room.name} (Night Price: {room.night_price})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Total Price:</label>
          <input
            type="number"
            step="0.01"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Checked In:</label>
          <input
            type="datetime-local"
            value={checkedIn || ''}
            onChange={(e) => setCheckedIn(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Checked Out:</label>
          <input
            type="datetime-local"
            value={checkedOut || ''}
            onChange={(e) => setCheckedOut(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Reservation'}
        </button>
      </form>
    </div>
  );
};
const HomePage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v1/reservations/')
      .then(response => response.json())
      .then(data => setReservations(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const showPop = () => setIsVisible(true);
  const hidePop = () => setIsVisible(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6 px-4">
        <h1 className="text-3xl font-bold">Reservations List</h1>
        <button
          onClick={showPop}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Reservation
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checked In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Checked Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {reservations.map((reservation) => (
    <tr key={reservation.id}>
      <td className="px-6 py-4">{reservation.id}</td>
      <td className="px-6 py-4">{reservation.start_date}</td>
      <td className="px-6 py-4">{reservation.end_date}</td>
      <td className="px-6 py-4">{reservation.total_price}</td>
      <td className="px-6 py-4">{reservation.checked_in ? new Date(reservation.checked_in).toLocaleString() : 'Not Checked In'}</td>
      <td className="px-6 py-4">{reservation.checked_out ? new Date(reservation.checked_out).toLocaleString() : 'Not Checked Out'}</td>
      <td className="px-6 py-4">{reservation.customer.name}</td>
      <td className="px-6 py-4">{reservation.room.name}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <ReservationPage />
            <button onClick={hidePop} className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
