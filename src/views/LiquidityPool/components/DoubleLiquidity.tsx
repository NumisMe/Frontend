import { useState, useMemo } from 'react'
import * as currencies from '../../../constants/currencies'
import useContractWrite from '../../../hooks/useContractWrite'
import { useWalletLP, useNativeBalances } from '../../../state/wallet/hooks'
import { useLPMatch } from '../../../state/internal/hooks'
import Value from '../../../components/Value'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Card from '../../../components/Card'
import Typography from '../../../components/Typography'
import { Row, Col, Form, Spin } from 'antd'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { ethers } from 'ethers'
import useTranslation from '../../../hooks/useTranslation'
import { LiquidityPool } from '../../../constants/type'
import useWeb3Provider from '../../../hooks/useWeb3Provider'

const { Text } = Typography

type Props = {
	pool: LiquidityPool
}

const TableHeader = (props: any) => (
	<Col span={props.span}>
		<Text style={{ float: props.float || 'none' }} type="secondary">
			{props.value}
		</Text>
	</Col>
)

const DoubleLiquidity: React.FC<Props> = ({ pool }) => {
	const translate = useTranslation()
	const currency = useMemo(
		() => currencies[`${pool.type.toUpperCase()}_LP`],
		[pool.type],
	)

	const { call: handleAddLiquidity, loading: loadingAddLiquidity } =
		useContractWrite({
			contractName: 'internal.LPMatch',
			method: 'addLiquidityETH',
			description: `addLiquidityETH`,
		})
	const { call: handleWithdraw, loading: loadingWithdraw } = useContractWrite(
		{
			contractName: 'internal.LPMatch',
			method: 'withdrawLP',
			description: `withdrawLP`,
		},
	)

	const { account } = useWeb3Provider()
	const nativeBalance = useNativeBalances([account])[account]

	const { userLP } = useLPMatch()

	const [depositAmount, setDeposit] = useState<string>('')
	const updateDeposit = (value: string) =>
		!isNaN(Number(value)) && setDeposit(value)
	const errorDeposit = useMemo(
		() => new BigNumber(depositAmount).gt(nativeBalance.amount),
		[nativeBalance, depositAmount],
	)
	const depositDisabled = useMemo(
		() =>
			depositAmount === '' ||
			new BigNumber(depositAmount).isZero() ||
			errorDeposit,
		[depositAmount, errorDeposit],
	)
	const onMaxDeposit = () =>
		setDeposit(nativeBalance?.amount.toString() || '0')

	const [withdrawAmount, setWithdraw] = useState<string>('')
	const updateWithdraw = (value: string) =>
		!isNaN(Number(value)) && setWithdraw(value)
	const errorWithdraw = useMemo(
		() => new BigNumber(withdrawAmount).gt(userLP.amount),
		[userLP?.amount, withdrawAmount],
	)
	const withdrawDisabled = useMemo(
		() =>
			withdrawAmount === '' ||
			new BigNumber(withdrawAmount).isZero() ||
			errorWithdraw,
		[withdrawAmount, errorWithdraw],
	)

	const onMaxWithdraw = () => setWithdraw(userLP?.amount.toString() || '0')

	return (
		<Card
			className="double-liquidity-card"
			title={
				<Text>
					<strong>Double Liquidity</strong>
				</Text>
			}
		>
			<div style={{ padding: '20px' }}>
				<Row gutter={24}>
					<TableHeader
						value={translate('Available Balance')}
						span={12}
					/>
					<TableHeader
						value={translate('Staked Balance')}
						span={12}
					/>
				</Row>

				<Row gutter={24}>
					<Col span={12} className={'balance'}>
						<Row
							justify="space-around"
							style={{ padding: '6px 0' }}
						>
							<img
								src={currencies.ETH.icon}
								height="24"
								alt="logo"
							/>
							<Value
								value={getBalanceNumber(nativeBalance?.value)}
								decimals={2}
								numberSuffix={` ${currencies.ETH.name}`}
							/>
						</Row>
					</Col>
					<Col span={12} className={'balance'}>
						<Row
							justify="space-around"
							style={{ padding: '6px 0' }}
						>
							<img src={currency.icon} height="24" alt="logo" />
							<Value
								value={getBalanceNumber(userLP?.value)}
								decimals={2}
								numberSuffix={` ${pool.symbol}`}
							/>
						</Row>
					</Col>
				</Row>

				<Row gutter={24}>
					<Col span={12}>
						<Form.Item validateStatus={errorDeposit && 'error'}>
							<Input
								onChange={(e) => updateDeposit(e.target.value)}
								value={depositAmount}
								min={'0'}
								placeholder="0"
								disabled={
									loadingAddLiquidity ||
									nativeBalance?.value.isZero()
								}
								onClickMax={onMaxDeposit}
							/>
						</Form.Item>
						<Button
							disabled={depositDisabled}
							onClick={async () =>
								await handleAddLiquidity({
									amount: new BigNumber(depositAmount)
										.multipliedBy(10 ** currency.decimals)
										.toString(),
									cb: () => setDeposit('0'),
								})
							}
							loading={loadingAddLiquidity}
						>
							Add Liquidity
						</Button>
					</Col>
					<Col span={12}>
						<Form.Item validateStatus={errorWithdraw && 'error'}>
							<Input
								onChange={(e) => updateWithdraw(e.target.value)}
								value={withdrawAmount}
								min={'0'}
								placeholder="0"
								disabled={
									loadingWithdraw || userLP?.value.isZero()
								}
								onClickMax={onMaxWithdraw}
							/>
						</Form.Item>
						<Button
							disabled={withdrawDisabled}
							onClick={async () =>
								await handleWithdraw({
									args: [
										new BigNumber(withdrawAmount)
											.multipliedBy(
												10 ** currency.decimals,
											)
											.toString(),
									],
									cb: () => setWithdraw('0'),
								})
							}
							loading={loadingWithdraw}
						>
							Withdraw LP
						</Button>
					</Col>
				</Row>
			</div>
		</Card>
	)
}

export default DoubleLiquidity
