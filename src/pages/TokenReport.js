// pages/ReportsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TokenTable from '../components/TokenTable';
import { fetchTokensRequested } from '../store/actions/tokenReportActions';

export default function TokenReport() {
    const [tokens, setTokens] = useState([]);
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tokenReport);

    // Fetch data from API on component mount
    useEffect(() => {
        dispatch(fetchTokensRequested({pageIndex:0,
            sortBy:null,
            search: null,
            startDate: null,
            endDate: null}));
        }, [fetchTokensRequested]);
    
    useEffect(() => {
        // Mock data for now
        setTokens(data);
    }, [data]);

    return (
        <div className="container mt-4">
        <h2>Reports</h2>
        <p className="text-muted">25519 Tokens</p>

        <div className="row mb-3">
            <div className="col-md-3 mb-2">
            <select className="form-select">
                <option>Testing Authorities</option>
                <option value="TXAG">TXAG</option>
            </select>
            </div>
            <div className="col-md-3 mb-2">
            <input type="date" className="form-control" />
            </div>
            <div className="col-md-3 mb-2">
            <input type="date" className="form-control" />
            </div>
            <div className="col-md-3 mb-2">
            <button className="btn btn-primary w-100">Export CSV</button>
            </div>
        </div>

        <TokenTable tokens={tokens} />
        </div>
    );
}
