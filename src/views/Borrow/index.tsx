import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'

import { Row, Col } from 'antd'
import {
	Deposit,
	Faucet,
	Borrow,
	Repay,
	Withdraw,
	CollateralOverview,
	LoanOverview,
} from './components'
import Page from '../../components/Page/Page'
import Tabs from '../../components/Tabs'
import Card from '../../components/Card'
import useTranslation from '../../hooks/useTranslation'
import { useAlchemist } from '../../state/wallet/hooks'
import useWeb3Provider from '../../hooks/useWeb3Provider'

const { TabPane } = Tabs

const DEFAULT_TAB = '#deposit'

const Alchemix: React.FC = () => {
	const translate = useTranslation()
	const { toBorrow } = useAlchemist()
	const { chainId } = useWeb3Provider()
	const navigate = useNavigate()
	const location = useLocation()

	const activeKey = useMemo(
		() => location.hash || DEFAULT_TAB,
		[location.hash],
	)
	return (
		<Page
			loading={false}
			mainTitle="Borrow"
			secondaryText="Future Yield Loans"
			value={`${toBorrow?.toNumber()}`}
			valueInfo="Availalbe To Borrow"
		>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={16}>
					<Card>
						<Tabs
							activeKey={activeKey}
							onTabClick={(key) =>
								navigate(`${location.pathname}${key}`)
							}
							destroyInactiveTabPane
						>
							<TabPane tab="Deposit" key="#deposit">
								<Deposit />
							</TabPane>
							<TabPane tab="Borrow" key="#borrow">
								<Borrow />
							</TabPane>

							<TabPane tab="Repay" key="#repay">
								<Repay />
							</TabPane>
							<TabPane tab="Withdraw" key="#withdraw">
								<Withdraw />
							</TabPane>
						</Tabs>
					</Card>

					{chainId == 5 && <Faucet />}
				</Col>
				<StyledCol xs={24} sm={24} md={24} lg={8}>
					<CollateralOverview />
					<LoanOverview />
				</StyledCol>
			</Row>
		</Page>
	)
}

export default Alchemix

const StyledCol = styled(Col)`
	@media only screen and (max-width: 991px) {
		margin-top: 16px;
	}
`
