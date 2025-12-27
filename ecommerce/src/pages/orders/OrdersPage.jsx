import axios from "axios";
import "./OrdersPage.css";
import { Header } from "../../components/Header";
import { useEffect, useState, Fragment } from "react";
import dayjs from "dayjs";
import { FormatMoney } from "../../utils/money";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

const OrdersPage = ({ cart }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{FormatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <OrderDetailsGrid order={order} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
