import React from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Stack } from '@mui/material';

const ClipboardWithTimerIcon = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <ContentPasteIcon style={{ fontSize: 24, color: '#6b7280' }} />
      <AccessTimeIcon style={{ fontSize: 12, marginLeft: '-10px', marginTop: '30' }} />
    </Stack>
  );
};

export default ClipboardWithTimerIcon;
