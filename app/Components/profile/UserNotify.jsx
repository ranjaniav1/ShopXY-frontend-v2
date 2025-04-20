import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  useTheme,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  fetchUserNotifications,
  removeNotification,
} from "@/app/helper/ProfileUtils";

const UserNotify = ({ userId, activeTab }) => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 7;

  useEffect(() => {
    if (activeTab === 0 && userId) {
      fetchUserNotifications(userId, page, limit, (response) => {
        setNotifications(response.messages || []);
        setTotal(response.total || 0);
      });
    }
  }, [activeTab, userId, page]);

  useEffect(() => {
    if (activeTab === 0) {
      setPage(1);
    }
  }, [activeTab]);

  if (activeTab !== 0) return null;

  const handleDelete = (id) => {
    removeNotification(id, userId, page, limit, setNotifications, setTotal);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Box>
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
              backgroundColor: theme.palette.background.main,
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
            onMouseEnter={() => setHoveredNotificationId(notification._id)}
            onMouseLeave={() => setHoveredNotificationId(null)}
          >
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
              }}
            >
              {notification.notify}
            </Typography>
            <Typography variant="body2" sx={{ ml: 2, minWidth: "120px" }}>
              {new Date(notification.timestamp).toLocaleString()}
            </Typography>
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
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          No notifications available.
        </Typography>
      )}

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page <= 1}>
          Previous
        </Button>
        <Typography variant="body2">
          Page {page} of {totalPages}
        </Typography>
        <Button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page >= totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UserNotify;
