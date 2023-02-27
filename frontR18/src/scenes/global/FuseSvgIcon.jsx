import clsx from 'clsx';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import Icon from '@mui/material/Icon';

const Root = styled(Box)(({ theme, ...props }) => {
	console.log('%c props ', 'color:green', props);

	return {
		width: props.size,
		height: props.size,
		minWidth: props.size,
		minHeight: props.size,
		fontSize: props.size,
		lineHeight: props.size,
		color: {
			primary: theme.palette.primary.main,
			secondary: theme.palette.secondary.main,
			info: theme.palette.info.main,
			success: theme.palette.success.main,
			warning: theme.palette.warning.main,
			action: theme.palette.action.active,
			error: theme.palette.error.main,
			disabled: theme.palette.action.disabled,
			inherit: undefined,
		}[props.color],
	};
});

const FuseSvgIcon = forwardRef((props, ref) => {
	const { children, size, sx, className, color } = props;
	const iconPath = children.replace(':', '.svg#');

	console.log('%c 03 FuseSvgIcon props', 'color:green', props);
	console.log('%c 04 FuseSvgIcon iconPath ', 'color:green', iconPath);

	return (
		<React.Fragment>
			{!props.children.includes(':') ? (
				<div>
					<p>FuseSvgIcon</p>
					<Icon ref={ref} {...props} />
				</div>
			) : (
				<Root
					{...props}
					component="svg"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					className={clsx('shrink-0 fill-current ', className)}
					ref={ref}
					size={size}
					sx={sx}
					color={color}
				>
					<p>FuseSvgIcon</p>
					<use xlinkHref={`assets/icons/${iconPath}`} />
				</Root>
			)}
		</React.Fragment>
	);
});

FuseSvgIcon.propTypes = {
	children: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	sx: PropTypes.object,
	color: PropTypes.oneOf([
		'inherit',
		'disabled',
		'primary',
		'secondary',
		'action',
		'error',
		'info',
		'success',
		'warning',
	]),
};

FuseSvgIcon.defaultProps = {
	children: '',
	size: 24,
	sx: {},
	color: 'inherit',
};

export default FuseSvgIcon;
