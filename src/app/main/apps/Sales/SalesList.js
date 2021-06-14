import { React, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../scrumboard/store';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectSales, getSales } from '../scrumboard/store/saleSlice';
import { getBoard } from '../scrumboard/store/boardSlice';
import SalesList1 from './SalesList1';

function SalesList() {

	const dispatch = useDispatch();

    const [status, setStatus] = useState(true)
	const salesAll = useSelector(selectSales);
	const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);

    const nomalStyle = 'bg-gray-200'
    const activeStyle = 'bg-gray-400'
    const style1 = status ? activeStyle : nomalStyle
    const style2 = !status ? activeStyle : nomalStyle 

    var sale = [];
    var buy = [];
    salesAll.map(sales => {
        if (sales.type == "sales") {
            sale.push(sales)
        } else {
            buy.push(sales)
        }
    })

    const handleList1 = () => {
        setStatus(true)
    }

    const handleList2 = () => {
        setStatus(false)
    }

	const routeParams = {
		boardId: 'customer',
		boardUri: 'board',
	};


	useEffect(() => {
		dispatch(getBoard(routeParams));
		dispatch(getSales());
	}, [dispatch]);


	return (
		<>
			<div className='p-64'>
          <Button onClick={handleList1} className={style1}>売上</Button>
          <Button onClick={handleList2} className={style2}>支払い</Button>
          </div>
           
            {status ? (
                <SalesList1 board={board} sales={sale} title="売上管理テーブル"/>
            ) : (
                <SalesList1 board={board} sales={buy} title="支払い管理テーブル"/>
            )}
            
		</>
	);
}

export default withReducer('scrumboardApp', reducer)(SalesList);
