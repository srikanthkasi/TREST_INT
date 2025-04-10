// pages/ReportsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TokenTable from '../components/TokenTable';
import { fetchTokensRequested } from '../store/actions/tokenReportActions';

const TokenReport = () => {
    const dispatch = useDispatch();
    const { tokens, loading, error } = useSelector((state) => state.tokenReport);
    const totalTokens = tokens ? tokens[0]?.tokensCount : 0;
    const [taOptions, setTaOptions] = React.useState([]);
    const [selectedValue, setSelectedValue] = React.useState('');
    // Fetch data from API on component mount
    useEffect(() => {
        dispatch(fetchTokensRequested({pageIndex:0,
            sortBy:null,
            search: null,
            startDate: null,
            endDate: null}));
        }, [fetchTokensRequested]);
    
    useEffect(() => {
        const options = tokens.map(item => ({
            value: item.taId,
            label: item.testAuthority.name,
          }));
    
          // Sort options by label (TA Name) in ascending order
          options.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
    
          setTaOptions(options);
    }, [tokens]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log('Selected TA Name:', event.target.value);
        // You can perform further actions with the selected value here
    };
    
    return (
        <div className="container mt-4">
        <h2>Reports</h2>
        <p className="text-muted">{totalTokens} Tokens</p>

        <div className="row mb-3">
            <div className="col-md-3 mb-2">
            <select className="form-select" value={selectedValue} onChange={handleChange}>
                <option>Testing Authorities</option>
                {taOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
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
};
export default TokenReport;
