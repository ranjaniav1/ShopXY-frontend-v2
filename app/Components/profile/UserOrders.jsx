'use client';
import React, { useEffect, useState } from 'react';
import CustomButton from '@/app/Custom/CustomButton';
import CustomTypography from '@/app/Custom/CustomTypography';
import { DeleteAllOrder, fetchOrder } from '@/app/helper/ProfileUtils';
import generateInvoice from './generateInvoice';

const UserOrders = ({ userId, activeTab }) => {
  const [order, setOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchOrder(userId, page, 1, (data) => {
        setOrder(data.orders || []);
        setTotal(data.total || 0);
      });
    }
  }, [userId, page]);

  useEffect(() => {
    if (activeTab === 1) {
      setPage(1);
    }
  }, [activeTab]);

  const totalPages = Math.ceil(total / 1);

  return (
    <div className="space-y-6">
      {order.length > 0 ? (
        order.map((orderItem) => (
          <div
            key={orderItem._id}
            className="rounded-lg border border-gray-200 p-4 shadow-md transition hover:shadow-lg bg-body"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <p className="text-sm font-semibold text-primary">
                Order ID: {orderItem._id}
              </p>
              <CustomButton
                onClick={() => generateInvoice(orderItem)}
                title="Download Invoice"
                className="mt-2 sm:mt-0"
              />
            </div>

            {/* Status + Date */}
            <div className="flex flex-col sm:flex-row justify-between text-sm text-tsecondary mb-3">
              <p>Order Status: {orderItem.orderStatus}</p>
              <p>Order Date: {new Date(orderItem.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Product List */}
            <div className="border border-dashed border-gray-300 rounded-lg p-4 space-y-4">
              {orderItem.product.map((item, index) => (
                <div
                  key={item._id}
                  className="flex items-start gap-4 border-b last:border-none pb-4"
                >
                  {/* Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-secondary"
                  />

                  {/* Product Info */}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-tprimary">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-tsecondary">
                      {item.product.description}
                    </p>
                  </div>

                  {/* Price & Qty */}
                  <div className="flex flex-col text-right whitespace-nowrap text-sm">
                    <p className="font-semibold text-tprimary">
                      ₹{item.product.discounted_price.toFixed(2)}
                    </p>
                    <p className="text-xs text-tsecondary">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 text-sm">
              <p className="text-primary">Payment Type: {orderItem.paymentType}</p>
              <p className="text-primary">
                Total Price: ₹
                {orderItem.discountedPrice > 0
                  ? orderItem.discountedPrice.toFixed(2)
                  : orderItem.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-tprimary mt-6">No orders found.</p>
      )}

      {/* Pagination */}
      {order.length > 0 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page <= 1}
            className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-tsecondary">
            Page {page} of {totalPages}
          </p>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages}
            className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
