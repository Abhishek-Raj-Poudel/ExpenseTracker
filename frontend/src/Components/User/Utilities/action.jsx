import { FiEdit, FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { ButtonDanger } from "../../../Styles/Button";
import Flexbox from "../../../Styles/Flexbox";

export const Action = ({ obj, handleClick }) => (
  <Flexbox justify="flex-start" align="center" gap="1rem" padding="12pxc">
    <NavLink to={`edit=${obj._id}`}>
      <button>
        <FiEdit></FiEdit>
      </button>
    </NavLink>
    <ButtonDanger onClick={handleClick}>
      <FiTrash2></FiTrash2>
    </ButtonDanger>
  </Flexbox>
);
// () => {
//     return deleteClient(obj._id);
//   }
