import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchUserNotifications,
  removeAllNotifications,
  removeNotification,
} from "@/app/helper/ProfileUtils";
import CustomTypography from "@/app/Custom/CustomTypography";
import EmptyCart from "../EmptyCart";

const UserNotify = ({ userId, activeTab }) => {
  const theme = useTheme();
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
    <Box>
      {notifications.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => removeAllNotifications(userId, setNotifications)}
          >
            Remove All
          </Button>
        </Box>
      )}

      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Paper
            key={notification._id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
             
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
              transition: "0.3s",
              "&:hover": {
                boxShadow: 6,
              },
            }}
            onMouseEnter={() => setHoveredNotificationId(notification._id)}
            onMouseLeave={() => setHoveredNotificationId(null)}
          >
            <CustomTypography
              variant="body1"
              sx={{ flexGrow: 1, fontWeight: "bold", color: theme.palette.text.primary }}
            >
              {notification.notify}
            </CustomTypography>
            <CustomTypography
              variant="body2"
              sx={{ ml: 2, minWidth: "120px", color: theme.palette.text.secondary }}
            >
              {new Date(notification.timestamp).toLocaleString()}
            </CustomTypography>
            {hoveredNotificationId === notification._id && (
              <IconButton
                onClick={() => handleDelete(notification._id)}
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: theme.palette.error.main,
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Paper>
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
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page <= 1}>
            Previous
          </Button>
          <CustomTypography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Page {page} of {totalPages}
          </CustomTypography>
          <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page >= totalPages}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserNotify;
