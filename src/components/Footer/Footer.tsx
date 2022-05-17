import React from 'react'
import { Layout } from 'antd'

import styled from 'styled-components'

import Nav from './components/Nav'

const Footer: React.FC = () => (
	<StyledFooter>
		<StyledFooterInner>
			<Nav />
		</StyledFooterInner>
	</StyledFooter>
)

const StyledFooter = styled(Layout.Footer)`
	padding: 0 0 0;
	width: 100%;
	background: #171717;
	margin-top: 36px;
`
//${(props) => props.theme.primary.footer};
const StyledFooterInner = styled.div`
	padding: 38px;
`

export default Footer
