import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'

const foundationModules = [
  'Authentication and RBAC foundation',
  'Academic masters and curriculum structure',
  'Student and faculty lifecycle',
  'Course allocation and outcome mapping',
  'Attendance, teaching plans, and assessments',
  'Attainment, reports, and accreditation workflows',
]

const nextMilestones = [
  'Connect backend to MongoDB and environment-driven configuration',
  'Add auth module, user roles, and permissions',
  'Introduce shared API hooks, layouts, and feature navigation',
]

function DashboardPage() {
  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Chip
              icon={<CheckCircleOutlineIcon />}
              label="Foundation scaffold started"
              color="secondary"
              sx={{ width: 'fit-content' }}
            />
            <Typography variant="h3">EduOBE application foundation</Typography>
            <Typography color="text.secondary">
              This starter workspace sets up the React frontend, Express backend,
              shared scripts, and the first dashboard shell for the platform.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" endIcon={<ArrowForwardIcon />}>
                Start backend modules
              </Button>
              <Button variant="outlined">Build frontend features</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Core platform areas
            </Typography>
            <Stack spacing={1.5}>
              {foundationModules.map((module) => (
                <Box
                  key={module}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: 'background.default',
                  }}
                >
                  <Typography>{module}</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Next milestones
            </Typography>
            <Stack spacing={2}>
              {nextMilestones.map((milestone, index) => (
                <Box key={milestone}>
                  <Typography variant="subtitle2" color="primary">
                    Step {index + 1}
                  </Typography>
                  <Typography color="text.secondary">{milestone}</Typography>
                  {index < nextMilestones.length - 1 ? <Divider sx={{ mt: 2 }} /> : null}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default DashboardPage
