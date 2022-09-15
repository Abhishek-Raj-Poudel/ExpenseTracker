import { Action } from "./action";

export const TableComponent = ({ array, handleClick }) => (
  <table>
    <thead>
      <tr>
        <th>S.N</th>
        <th>Name</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Role</th>
        <th>id</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {array.map((obj, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{obj.name}</td>
          <td>{obj.email}</td>
          <td>{obj.gender}</td>
          <td>{obj.role}</td>
          <td>{obj._id}</td>
          <td>
            <Action obj={obj} handleClick={handleClick} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
