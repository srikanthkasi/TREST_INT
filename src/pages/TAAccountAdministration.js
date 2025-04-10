import React, { useState, useEffect } from 'react';
import { fetchTaListRequested } from '../store/actions/taListActions';
import { useDispatch } from 'react-redux';
import { fetchTokensRequested } from '../store/actions/tokenReportActions';

const TAAccountAdministration = () => {
  const dispatch = useDispatch();
  const [tas, setTas] = useState([]);
  const [filter, setFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasPerPage = 2;

  // Fetch data from API on component mount
  useEffect(() => {
    dispatch(fetchTaListRequested());
    dispatch(fetchTokensRequested({pageIndex:0,
      sortBy:null,
      search: null,
      startDate: null,
      endDate: null}));
  }, [fetchTaListRequested, fetchTokensRequested]);

  const handleStatusChange = (index) => {
    const updatedTas = [...tas];
    updatedTas[index].status = updatedTas[index].status === 'Active' ? 'Inactive' : 'Active';
    setTas(updatedTas);
  };

  const filteredTas = tas.filter(
    (ta) =>
      ta.name.toLowerCase().includes(filter.toLowerCase()) &&
      ta.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  const indexOfLastTa = currentPage * tasPerPage;
  const indexOfFirstTa = indexOfLastTa - tasPerPage;
  const currentTas = filteredTas.slice(indexOfFirstTa, indexOfLastTa);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h1>TA Account Administration</h1>

      {/* Action Section */}
      <div className="mb-4">
        <button className="btn btn-primary mb-2">Add New TA</button>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search by name"
          onChange={(e) => setFilter(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Filter by email"
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <div className="dropdown mb-2">
          <button
            className="btn btn-success dropdown-toggle"
            type="button"
            id="statusDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by Status
          </button>
          <ul className="dropdown-menu" aria-labelledby="statusDropdown">
            <li><a className="dropdown-item" href="#" onClick={() => setFilter('')}>All</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => setFilter('Active')}>Active</a></li>
            <li><a className="dropdown-item" href="#" onClick={() => setFilter('Inactive')}>Inactive</a></li>
          </ul>
        </div>
      </div>

      {/* Table Section */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Date Updated</th>
            <th>TA Name</th>
            <th>TA Identifier</th>
            <th>Email Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTas.map((ta, index) => (
            <tr key={index}>
              <td>{ta.dateUpdated}</td>
              <td>{ta.name}</td>
              <td>{ta.identifier}</td>
              <td>{ta.email}</td>
              <td>{ta.status}</td>
              <td>
                <div>
                  <button className="btn btn-info me-2">View/Edit</button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleStatusChange(index)}
                  >
                    {ta.status === 'Active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {[...Array(Math.ceil(filteredTas.length / tasPerPage)).keys()].map((number) => (
            <li key={number + 1} className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TAAccountAdministration;
