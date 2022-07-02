import React from 'react';
import { Stack } from '@mui/material';
import Sidebar from './components/sidebar';
import Feed from './components/feed';
import Widgets from './components/widgets';

function App() {
  return (
    <Stack
      position='fixed'
      display='flex'
      sx={{
        width: '100%',
        height: '100%',
        padding: '0 240px',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          height: '100%',
          minHeight: '100%',
          maxHeight: '100%',
          width: 'calc(100% - 240px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </Stack>
  );
}

export default App;
