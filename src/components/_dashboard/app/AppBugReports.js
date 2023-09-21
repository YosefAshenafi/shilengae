import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/mobile-filled';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Tooltip, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.error.dark, 0)} 0%, ${alpha(
    theme.palette.error.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 234;

// eslint-disable-next-line react/prop-types
export default function AppBugReports({ total = TOTAL, tooltipText = '' }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={bugFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Tooltip title={tooltipText}>
        <Typography variant="h3">{total}</Typography>
      </Tooltip>
      <Tooltip title={tooltipText}>
        <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
          Active Users
        </Typography>
      </Tooltip>
    </RootStyle>
  );
}
