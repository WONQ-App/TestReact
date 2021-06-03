import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import clsx from 'clsx';

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});


export default function ListTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>対応状況</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">受付</TableCell>
            <TableCell align="center">ラベル</TableCell>
            <TableCell align="center">担当者</TableCell>
            <TableCell align="center">ステータス</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.lists.map((listValue, index) => 
            
            listValue.idCards.map((cardValue, index) => {
                
             const card = _.find(props.cards, { id: cardValue })
              
            const member = _.find(props.member, { id: card.idMembers[0] })
            
             return ( 
              <TableRow key={card.id}>
              <TableCell component="th" scope="row">
                {card.name}
              </TableCell>
              <TableCell align="center">{card.id}</TableCell>
              <TableCell align="center">{card.name}</TableCell>
              <TableCell align="center">
              {card.idLabels.length > 0 && (
								<div className="flex flex-wrap mb-8 -mx-4">
									{card.idLabels.map(id => {
										const label = _.find(props.label, { id });
										return (
											<Chip
												label={label.name}
												//{...getTagProps({ index })}
												className={clsx('m-3', label.class)}
											/>
											// <Tooltip title={label.name} key={id}>
											// 	<div className={clsx(label.class, 'w-32  h-6 rounded-6 mx-4 mb-6')} />
											// </Tooltip>
										);
									})}
								</div>
							)}
              </TableCell>
              <TableCell align="center" >
              {card.idMembers.length > 0 && (
								<div className="flex flex-wrap mb-12 -mx-4">
									{card.idMembers.map(id => {
										const member = _.find(props.member, { id });
                    console.log(member.avatar)
										return (
												<Avatar className="mx-4 w-32 h-32" src={member.avatar}/>
										);
									})}
									<div />
								</div>
							)}
							</TableCell>
              <TableCell align="center">
              <Typography type='title' className="text-8 font-medium cursor-pointer "  style={{ padding: 7.5, borderRadius:5, color: '#fff',backgroundColor: listValue.color}}>
							{listValue.name}
						</Typography>
              </TableCell>
            </TableRow>
            
            )})
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}