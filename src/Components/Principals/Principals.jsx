// AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, remove, set, push } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCMkQRCI7WSHHpKNdK91DC0DLcFw56Ohlg",
  authDomain: "facultyport.firebaseapp.com",
  databaseURL: "https://facultyport-default-rtdb.firebaseio.com",
  projectId: "facultyport",
  storageBucket: "facultyport.appspot.com",
  messagingSenderId: "296505134325",
  appId: "1:296505134325:web:3e506795892779742249bc"
};

const initialTestimonialState = {
  title:'',
  description: '',
  link:'',
};

function TestAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [testimonial, setTestimonial] = useState(initialTestimonialState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
    const database = getDatabase(firebaseApp);
    const testimonialsRef = ref(database, 'researchpapers');

    onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      const testimonialsArray = [];

      for (const uid in data) {
        const testimonial = {
          uid,
          ...data[uid],
        };

        testimonialsArray.push(testimonial);
      }

      setTestimonials(testimonialsArray);
    });
  }, []);

  const handleDelete = (uid) => {
    const firebaseApp = initializeApp(firebaseConfig);
    const database = getDatabase(firebaseApp);
    const testimonialRef = ref(database, `researchpapers/${uid}`);
    remove(testimonialRef);
  };

  const handleEdit = (uid) => {
    setEditingId(uid);
    const editedTestimonial = testimonials.find((test) => test.uid === uid);
    setTestimonial(editedTestimonial);
  };

  const handleUpdate = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const database = getDatabase(firebaseApp);
    const testimonialRef = ref(database, `researchpapers/${editingId}`);
    set(testimonialRef, testimonial);
    setEditingId(null);
    setTestimonial(initialTestimonialState);
  };

  const handleAdd = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const database = getDatabase(firebaseApp);
    const testimonialsRef = ref(database, 'researchpapers');
    const newTestimonialRef = push(testimonialsRef);
    set(newTestimonialRef, testimonial);
    setTestimonial(initialTestimonialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Define limits for each field
    const maxLength = {
      title:100,
      description: 500,
    };
  
    // Check if the value exceeds the maximum length
    if (value.length > maxLength[name]) {
      // Display a warning pop-up
      alert(`${name} should not exceed ${maxLength[name]} characters.`);
      
      // Truncate the value to the maximum length
      const truncatedValue = value.slice(0, maxLength[name]);
  
      setTestimonial((prevTestimonial) => ({
        ...prevTestimonial,
        [name]: truncatedValue,
      }));
    } else {
      // If the value is within the limit, update the state directly
      setTestimonial((prevTestimonial) => ({
        ...prevTestimonial,
        [name]: value,
      }));
    }
  };
  
  

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-4xl font-bold mb-6"></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div key={test.uid} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Edit Paper</h3>
            
            <label className="block mb-2">
              Title:
              <input
                type="text"
                name="title"
                value={editingId === test.uid ? testimonial.title : test.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={editingId !== test.uid}
              />
            </label>
    
            <label className="block mb-2">
              Description:
              <input
                type="text"
                name="description"
                value={editingId === test.uid ? testimonial.description : test.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={editingId !== test.uid}
              />
            </label>
            <label className="block mb-2">
              Link:
              <input
                type="text"
                name="link"
                value={editingId === test.uid ? testimonial.link : test.link}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                disabled={editingId !== test.uid}
              />
            </label>
            {editingId === test.uid ? (
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Update Paper
              </button>
            ) : (
              <button
                onClick={() => handleEdit(test.uid)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDelete(test.uid)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Add New Paper</h3>
        <label className="block mb-2">
          Title
          <input
            type="text"
            name="title"
            value={testimonial.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      
        <label className="block mb-2">
          Description:
          <input
            type="text"
            name="description"
            value={testimonial.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          Link:
          <input
            type="text"
            name="link"
            value={testimonial.link}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
        >
          Add Paper
        </button>
      </div>
    </div>
  );
}

export default TestAdmin;
