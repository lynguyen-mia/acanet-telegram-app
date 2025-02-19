import { useLoaderData } from "react-router-dom";
import convertToVND from "../utils/convertToVND";

const OrderDetail = () => {
  const order = useLoaderData();
  return (
    <div
      id="order-detail"
      className="container"
      style={{ maxWidth: "1140px", marginBottom: "200px" }}
    >
      <h1 className="fs-3 mt-5">
        <strong className="fs-4">INFORMATION ORDER</strong>
      </h1>
      <div className="user-detail my-3">
        <div>ID User: {order.user.userId}</div>
        <div>Full Name: {order.user.name}</div>
        <div>Phone: {order.user.phone}</div>
        <div>Address: {order.user.address}</div>
        <div>
          Total: <strong>{convertToVND(order.total)}</strong>
        </div>
      </div>

      {/* Order detail table */}
      <div className="table-responsive">
        <table className="table align-middle text-center mt-5 w-100">
          <thead>
            <tr className="row-cols-5">
              <td className="col-3 text-break" style={{ minWidth: "120px" }}>
                ID PRODUCT
              </td>
              <td className="col-2">IMAGE</td>
              <td className="col-3" style={{ minWidth: "120px" }}>
                NAME
              </td>
              <td className="col-2">PRICE</td>
              <td className="col-2">COUNT</td>
            </tr>
          </thead>
          <tbody>
            {order.items.map((p) => (
              <tr key={p._id} className="row-cols-5">
                <td className="col-3 text-break" style={{ minWidth: "120px" }}>
                  {p.product._id}
                </td>
                <td className="col-2">
                  <img
                    src={
                      p.product.img1.includes("public/images")
                        ? `/${p.product.img1}`
                        : p.product.img1
                    }
                    alt={p.product.name}
                    style={{ width: "150px", height: "auto" }}
                  />
                </td>
                <td className="col-3" style={{ minWidth: "120px" }}>
                  {p.product.name}
                </td>
                <td className="col-2">{convertToVND(p.product.price)}</td>
                <td className="col-2">{p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderDetail;

export async function loader({ request, params }) {
  const orderId = params.orderId;

  const res = await fetch(`http://localhost:5000/client/order?id=${orderId}`, {
    credentials: "include",
  });

  if (res.status === 401) {
    window.alert("Your session has expired, please log in again");
    return window.location.replace("/login");
  }

  if (!res.ok) {
    console.log("Can't fetch order detail");
  }
  const result = await res.json();
  return result.data;
}
