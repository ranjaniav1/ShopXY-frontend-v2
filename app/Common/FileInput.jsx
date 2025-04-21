// FileInput.js
import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import CustomTypography from '../Custom/CustomTypography';

const FileInput = ({ t, avatar, handleFileClick, handleFileChange }) => (
    <Box
        sx={{ display: 'flex', alignItems: 'center', border: '1px dashed #ccc', borderRadius: '4px', padding: '8px', cursor: 'pointer', mb: 2 }}
        onClick={handleFileClick}
    >
        <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
        <IconButton color="primary" component="span">
            <AddPhotoAlternate />
        </IconButton>
        <CustomTypography variant="body2" sx={{ ml: 2 }}>
            {avatar ? avatar.name : t('Upload Avatar')}
        </CustomTypography>
    </Box>
);

export default FileInput;
