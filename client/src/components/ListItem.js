import React, { useState } from 'react';
import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal';

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteToDo = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todo/${task.id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.status === 200) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          Edit
        </button>
        <button className="delete" onClick={deleteToDo}>
          Delete
        </button>
      </div>
      {showModal && (
        <Modal
          model={'edit'}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      )}
    </li>
  );
};

export default ListItem;
