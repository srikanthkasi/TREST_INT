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
            <td>{token.taId}</td>
            <td>{token.testAuthority.name}</td>
            <td>{token.testAuthority.email}</td>
            <td>{token.testAuthority.status}</td>
            <td>{token.tokensSubmitted}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
