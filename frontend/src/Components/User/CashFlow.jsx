import React, { useEffect, useState, useRef } from "react";
import { HttpClient } from "../../utils/httpClients";
//redux
import { useSelector } from "react-redux";
import { CSVLink } from "react-csv";

//style Import
import styled from "styled-components";
import Flexbox from "../../Styles/Flexbox";
import Card from "../../Styles/Card";
import { StyledText } from "../../Styles/Texts";
import { FiDownload } from "react-icons/fi";

const CashGrid = styled.div`
  display: Grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  & table {
    grid-column: 1 / span 3;
    background-color: ${({ theme }) => theme.colour.cards};
    border-radius: 8px;
  }
`;

export default function CashFlow() {
  const SHOP = useSelector((state) => state.office);

  let allOrderArr = [];
  let [allOrders, setAllOrders] = useState([]);
  let [orderToExport, setOrderToExport] = useState([]);
  let [amountEarned, setAmountEarned] = useState(0);
  let [amountPending, setAmountPending] = useState(0);
  let [estimatedAmount, setEstimatedAmount] = useState(0);

  const http = new HttpClient();
  const tempGetAllOrders = useRef();
  const tempSetAllValue = useRef();

  const getAllOrders = () => {
    SHOP.order_id.map(async (obj) => {
      try {
        const response = await http.getItemById(`order/${obj}`);
        let responseValue = response.data.data;
        if (responseValue) {
          allOrderArr.push(responseValue);
          setAllOrders([...allOrderArr]);
          updateCashValue(responseValue);
        } else {
          console.log("User not found ");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  tempGetAllOrders.current = getAllOrders;

  useEffect(() => {
    tempGetAllOrders.current();
  }, [SHOP]);

  const setAllValue = () => {
    setEstimatedAmount(amountEarned + amountPending);
    exportValue();
  };

  tempSetAllValue.current = setAllValue;

  useEffect(() => {
    tempSetAllValue.current();
  }, [allOrders]);

  const updateCashValue = (obj) => {
    if (obj.paid) {
      return setAmountEarned(
        (prevAmountEarned) => prevAmountEarned + obj.total_price
      );
    } else if (obj.paid === null) {
      return;
    } else if (!obj.paid) {
      return setAmountPending((prevAmount) => prevAmount + obj.total_price);
    }
  };

  const exportValue = () => {
    let array = [];
    allOrders.map((obj) => {
      array.push({
        Name: obj.client_name,
        Product: obj.products_name,
        Price: obj.total_price,
        Paid: obj.paid ? "Yes" : "No",
        Time: obj.createdAt,
      });
      setOrderToExport(array);
    });
  };

  return (
    <>
      <CSVLink data={orderToExport}>
        <button>
          <FiDownload />
        </button>
      </CSVLink>

      <Flexbox column align="center">
        <h2>Earnings Record</h2>
        <CashGrid>
          <Card>
            <h3>Amount Earned</h3>
            <h2>{amountEarned}</h2>
          </Card>
          <Card>
            <h3>Amount Pending</h3>
            <h2>{amountPending}</h2>
          </Card>
          <Card>
            <h3>Estimated Amount</h3>
            <h2>{estimatedAmount}</h2>
          </Card>
          <table id="cashflow-table">
            <thead>
              <tr>
                <th>
                  <h3>S.N</h3>
                </th>
                <th>
                  <h3>Name</h3>
                </th>
                <th>
                  <h3>Product</h3>
                </th>
                <th>
                  <h3>Price</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((obj, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{obj.client_name}</td>
                  <td>{obj.products_name}</td>
                  <td>
                    <StyledText colour={obj.paid ? null : "warning"}>
                      {obj.total_price}
                    </StyledText>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CashGrid>
      </Flexbox>
    </>
  );
}
