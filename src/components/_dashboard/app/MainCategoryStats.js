import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getCategoryFilterStats } from '../../../request/category';

// eslint-disable-next-line react/prop-types
export default function CategoryStats({ type = 'main' }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    getCategoryFilterStats(type).then((res) => {
      setStats(res);
      console.log(res);
    });
  }, [type]);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">Category Name</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">Total</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stats.map((stat) => (
            <TableRow key={stat.id}>
              <TableCell>{stat.name}</TableCell>
              <TableCell>
                {stat.total} Click{stat.total > 1 && 's'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
