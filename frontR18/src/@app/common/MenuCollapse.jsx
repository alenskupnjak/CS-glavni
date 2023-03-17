import React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { observer } from 'mobx-react';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import agent from 'app/api/agent';
import ColorSet from '@app/theme/colorSet';
import { rootStore } from '@app/stores';

function MenuCollapse({ data }) {
	const [open, setOpen] = React.useState(false);
	const [menuItems, setMenuItems] = React.useState([]);

	const handleClick = async () => {
		setOpen(!open);
		const response = await agent.SofaLoc.getUniqueTournaments(data.id);
		setMenuItems(response.groups[0].uniqueTournaments);
	};

	return (
		<List
			sx={{
				fontSize: '1.1rem',
				bgcolor: open ? ColorSet().primary[500] : ColorSet().primary[400],
				paddingTop: '0',
				paddingBottom: '0',
				'& .MuiList-root': {
					paddingTop: '0',
					paddingBottom: '0',
					paddingLeft: '4rem',
					color: ColorSet().blueAccent[300],
				},
			}}
		>
			<ListItemButton onClick={handleClick} sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<ListItemIcon>
					<img src={data.linkImg} alt={data.name} width="24" height="24" />
				</ListItemIcon>
				<ListItemText
					primary={data.name}
					sx={{
						'& .MuiTypography-root': {
							paddingTop: '0',
							paddingBottom: '0',
							paddingLeft: '10px',
							lineHeight: '1',
							fontSize: '1.2rem',
						},
					}}
				/>
				<ListItemText
					primary={`${data.eventsNum === 0 ? '' : data.eventsNum}`}
					className="allignRight"
					sx={{
						textAlign: 'right',
						marginRight: '5px',
						color: ColorSet().redAccent[600],
					}}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{menuItems.map(data => {
						return (
							<ListItemButton
								sx={{ pl: 1 }}
								key={data.id}
								onClick={() => rootStore.sportsStore.loadSportsTable(data.id)}
							>
								{data.name}
							</ListItemButton>
						);
					})}
				</List>
			</Collapse>
		</List>
	);
}

export default observer(MenuCollapse);
