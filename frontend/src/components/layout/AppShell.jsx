import SchoolIcon from '@mui/icons-material/School'
import { AppBar, Box, Container, Stack, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'

function AppShell() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <SchoolIcon />
            <Box>
              <Typography variant="h6">EduOBE</Typography>
              <Typography variant="body2" sx={{ opacity: 0.85 }}>
                Outcome Based Education and Academic Quality Platform
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

export default AppShell
