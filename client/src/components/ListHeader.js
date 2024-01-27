import React, { useState } from 'react';
import Modal from './Modal';
import { useCookies } from 'react-cookie';

const ListHeader = ({ listName, getData }) => {
  const [cookies, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  console.log('cookies', cookies);
  const signOut = () => {
    console.log('signout');
    removeCookie('AuthToken');
    removeCookie('Email');
    window.location.reload();
  };

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && (
        <Modal model={'create'} setShowModal={setShowModal} getData={getData} />
      )}
    </div>
  );
};

export default ListHeader;
