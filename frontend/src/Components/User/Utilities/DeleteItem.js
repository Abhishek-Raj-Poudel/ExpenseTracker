import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOfficeSuccess } from "../../../Redux/Office/officeAction";
import { HttpClient } from "../../../utils/httpClients";

export const DeleteItem = (itemId, link, itemArray, subjectToDelete) => {
  const shop = useSelector((state) => state.office);
  const shop_id = useSelector((state) => state.user.shop_id);
  let updatedArray = itemArray.filter((object) => object !== itemId);
  const dispatch = useDispatch();

  const http = new HttpClient();

  useEffect(() => {
    http
      .deleteItem(link, true)
      .then((response) => {
        if (response.data.status === 200) {
          //success alert needed
          if (subjectToDelete === "user") {
            updateShop({ ...shop, user_id: updatedArray });
          } else {
            updateShop({ ...shop, order_id: updatedArray });
          }
        } else {
          //   error message needed
          // error(response.data.msg);
          console.log(response.data.msg);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateShop = (updatedShop) => {
    http
      .updateItem(`shop/${shop_id}`, updatedShop)
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(fetchOfficeSuccess(updatedShop));
        }
      })
      .catch();
  };
};
