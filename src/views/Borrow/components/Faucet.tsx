import React, { useState, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import Typography from '../../../components/Typography'
import Button from '../../../components/Button'
import Divider from '../../../components/Divider'
import Input from '../../../components/Input'
import Card from '../../../components/Card'
import useContractWrite from '../../../hooks/useContractWrite'
import BigNumber from 'bignumber.js'
import useTranslation from '../../../hooks/useTranslation'

const { Text } = Typography

const Faucet: React.FC = () => {
	const translate = useTranslation()
	const { call, loading } = useContractWrite({
		contractName: 'currencies.ERC20.mim.contract',
		method: 'mint',
		description: `mint`,
	})

	const [amount, setAmount] = useState('0')

	return (
		<Card title="MIM Faucet">
			<div style={{ margin: '20px' }}>
				<Row>
					<StyledText>Get mock MIM for testing</StyledText>
				</Row>
			</div>

			<Divider style={{ margin: 0, padding: 0 }} />

			<StyledDiv>
				<Row style={{ marginBottom: '20px' }}>
					<Col span={8}>
						<StyledText>{translate('Amount')}</StyledText>
					</Col>
					<Col span={16}>
						<Row>
							<Input
								onChange={(e) => {
									!isNaN(Number(e.target.value)) &&
										setAmount(e.target.value)
								}}
								value={amount}
								min={'0'}
								placeholder="0"
								suffix={'MIM'}
							/>
						</Row>
					</Col>
				</Row>

				<Button
					style={{ width: '100%', marginTop: '14px' }}
					disabled={
						new BigNumber(amount).isZero() ||
						new BigNumber(amount).isNaN()
					}
					loading={loading}
					onClick={() =>
						call({
							args: [
								new BigNumber(amount)
									.multipliedBy(10 ** 18)
									.toString(),
							],
						})
					}
				>
					Mint
				</Button>
			</StyledDiv>
		</Card>
	)
}

export { Faucet }

const StyledDiv = styled.div`
	padding: 30px;
	width: 100%;
`

const StyledText = styled(Text)`
	font-size: 20px;
`
