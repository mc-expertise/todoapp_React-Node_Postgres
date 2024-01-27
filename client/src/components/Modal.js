import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const Modal = ({ model, setShowModal, task, getData }) => {
  const [cookies] = useCookies(null);
  const editMode = model === 'edit' ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    console.log('1', data);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log(response, 'response');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todo/${task.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log(response, 'response');
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {model} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form action="">
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
            type="text"
          />
          <label for="range">Drag to select your current progress</label>
          <input
            required
            max="100"
            id="range"
            min="0"
            step="20"
            name="progress"
            className="progress"
            value={data.progress}
            onChange={handleChange}
            type="range"
          />

          <input
            className={model}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
