import { useEffect, useState } from 'react';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(null);
  const userEmail = cookies.Email;
  const authToken = cookies.AuthToken;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/todos/${userEmail}`
      );
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log('mohamed', { details: error });
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []);

  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  console.log(sortedTasks);
  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'🏆 TaskSnap'} getData={getData} />
          <p className="user-email">
            Welcome Back{' '}
            <span style={{ color: '#000', fontWeight: 'bold' }}>
              {userEmail}
            </span>
          </p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
        </>
      )}
      <p className="copyright">© Creative Coding LLC</p>
    </div>
  );
}

export default App;
