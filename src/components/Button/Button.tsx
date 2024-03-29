import React from 'react'
import styled from 'styled-components'
import { Button as BaseButton, ButtonProps } from 'antd'

type Props = ButtonProps & { height?: string }

const StyledButton = styled<any>(BaseButton)`
	background: #171717;
	color: #f8ca02;
	border: none;
	border-radius: 7px;
	margin-top: 20;
	height: ${(props) => props.height || '50px'};
	font-size: 17px;
	font-weight: 700;

	&:hover {
		background-color: #171717;
	}
	&:active {
		background-color: #171717;
	}
	&:focus {
		background-color: #171717;
	}
	&[disabled] {
		color: #8c8c8c;
		background-color: #f0f0f0;
		border: none;
	}
`

const Button: React.FC<Props> = ({ children, ...rest }) => (
	<StyledButton type="primary" {...rest}>
		{children}
	</StyledButton>
)

export default Button
