import {React, useState,useEffect} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { newSales } from 'app/main/apps/scrumboard/store/boardSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const schema = yup.object().shape({
	price: yup.string().required('You must enter a title')
});

export default function SalesInput(props) {
	
	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = useState(null);
	const [day, setDay] = useState(new Date())
	const [open, setOpen] = useState(false);

    const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			price: ''
		},
		resolver: yupResolver(schema)
	});

    const { isValid, dirtyFields, errors } = formState;


    useEffect(() => {
		if (!open) {
			reset({
				price: ""
			});
		}
	}, [open, reset ]);

	const handleOpenPop = () => {
	  setOpen(true);
	};
  
	const handleClosePop = () => {
	  setOpen(false);
	};

    function formatDate (date, format) {
        format = format.replace(/yyyy/g, date.getFullYear());
        format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
        format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
        format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
        format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
        format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
        return format;
      };

	function onSubmit(data) {
        let formatDay = formatDate(day, 'yyyy/MM/dd')

			dispatch(newSales({ boardId: props.board.id, cardId: props.card.id, title: props.card.name, type: 'sales', day: formatDay, price: data.price}));
			handleClosePop()
	}

	return (
		<div>
			<Button 
			    
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="outlined"
				color="secondary"
				onClick={handleOpenPop}
				classes={{
					root: 'rounded'
				  }}
			>
				売上管理
			</Button>
            <Dialog
        open={open}
        onClose={handleClosePop}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
		className='rounded'
      >
        <DialogTitle 
		id="alert-dialog-title" 
		className='grid justify-items-center'
		>
		売り上げ入力
		</DialogTitle>
           <DialogContent className="mt-40">
					<Controller
						name="price"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								required
								fullWidth
								//variant="filled"
								label="料金入力"
								autoFocus
							/>
						)}
					/>
                    <Button autoFocus variant="contained" color="primary" 
						style={{ color: 'white', backgroundColor: '#89c3eb',borderRadius: 2 }}
						onClick={handleSubmit(onSubmit) }>
							保存
						</Button>
        </DialogContent>
      </Dialog>
		</div>
	);
}
