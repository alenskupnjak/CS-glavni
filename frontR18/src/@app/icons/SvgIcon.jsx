import clsx from 'clsx';
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

const Root = styled(Box)(({ theme, ...props }) => {
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

function WrappedIcon(props) {
	return <Icon {...props} />;
}

WrappedIcon.muiName = 'Icon';

const SvgIcon = forwardRef((props, ref) => {
	const { children, size, sx, className, color } = props;

	const iconPath = children.replace(':', '.svg#');
	return (
		<React.Fragment>
			{!props.children.includes(':') ? (
				<IconButton>
					<WrappedIcon>alarm</WrappedIcon>
				</IconButton>
			) : (
				<Root
					{...props}
					component="svg"
					// fill="none"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 100 100"
					className={clsx('shrink-0 fill-current ', className)}
					ref={ref}
					size={size}
					sx={sx}
					color={color}
				>
					<p>SvgIcon</p>
					<use xlinkHref={`assets/icons/${iconPath}`} />
				</Root>
			)}
		</React.Fragment>
	);
});

SvgIcon.propTypes = {
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

SvgIcon.defaultProps = {
	children: '',
	size: 24,
	sx: {},
	color: 'inherit',
};

export default SvgIcon;
