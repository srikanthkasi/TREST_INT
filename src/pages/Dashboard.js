import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataRequest } from '../store/actions/dashboardActions';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  
  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);
  
  
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  /*
  return (
    <div className="container mt-4">
      <h2>Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  */
};

export default Dashboard;
