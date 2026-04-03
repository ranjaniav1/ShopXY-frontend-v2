'use client';

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import {
  fetchUserNotifications,
  removeAllNotifications,
  removeNotification,
} from "@/app/helper/ProfileUtils";
import CustomTypography from "@/app/Custom/CustomTypography";
import EmptyCart from "../card/EmptyCart";

const UserNotify = ({ userId, activeTab }) => {
  const [notifications, setNotifications] = useState([]);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchUserNotifications(userId, page, 8, (response) => {
        setNotifications(response.messages || []);
        setTotal(response.total || 0);
      });
    }
  }, [userId, page]);

  useEffect(() => {
    if (activeTab === 0) {
      setPage(1);
    }
  }, [activeTab]);

  if (activeTab !== 0) return null;

  const handleDelete = async (notificationId) => {
    await removeNotification(notificationId, userId, setNotifications, notifications);
  };

  const totalPages = Math.ceil(total / 8);

  return (
    <div className="mt-4">
      {notifications.length > 0 && (
        <div className="flex justify-end mb-3">
          <button
            onClick={() => removeAllNotifications(userId, setNotifications)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Remove All
          </button>
        </div>
      )}

      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification._id}
            onMouseEnter={() => setHoveredNotificationId(notification._id)}
            onMouseLeave={() => setHoveredNotificationId(null)}
            className="relative bg-white dark:bg-body border-l-4 border-primary shadow-md rounded-md px-4 py-3 mb-3 transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <CustomTypography variant="body1" className="font-semibold text-tprimary">
                {notification.notify}
              </CustomTypography>
              <CustomTypography variant="body2" className="text-tsecondary min-w-[120px] ml-4 text-right">
                {new Date(notification.timestamp).toLocaleString()}
              </CustomTypography>
            </div>
            {hoveredNotificationId === notification._id && (
              <button
                onClick={() => handleDelete(notification._id)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-600 hover:text-white hover:bg-red-500 p-1 rounded-full transition"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        ))
      ) : (
        <EmptyCart
          src="/search-not-found.png"
          title="No notifications yet"
          subtitle="You’ll be notified when there’s something new."
          buttonText="Explore Now"
          buttonHref="/"
        />
      )}

      {notifications.length > 0 && (
        <div className="flex justify-between items-center mt-4 text-tsecondary">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page <= 1}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm  disabled:opacity-50"
          >
            Previous
          </button>
          <CustomTypography variant="body2" >
            Page {page} of {totalPages}
          </CustomTypography>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page >= totalPages}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm  disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNotify;
