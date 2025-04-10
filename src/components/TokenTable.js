// components/TokenTable.jsx
import React from 'react';

export default function TokenTable({ tokens }) {
  return (
    <table className="table table-bordered table-hover">
      <thead className="table-light">
        <tr>
          <th>TA Identifier</th>
          <th>TA Name</th>
          <th>Email Address</th>
          <th>Status</th>
          <th>Tokens Submitted</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token, index) => (
          <tr key={index}>
            <td>{token.identifier}</td>
            <td>{token.name}</td>
            <td>{token.email}</td>
            <td>{token.status}</td>
            <td>{token.submitted}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
