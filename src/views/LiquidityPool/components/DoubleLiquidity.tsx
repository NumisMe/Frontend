import { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import * as currencies from '../../../constants/currencies'
import useContractWrite from '../../../hooks/useContractWrite'
import Value from '../../../components/Value'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Card from '../../../components/Card'
import Typography from '../../../components/Typography'
import { Row, Col, Form, Spin } from 'antd'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useTranslation from '../../../hooks/useTranslation'
import { LiquidityPool } from '../../../constants/type'
import useWeb3Provider from '../../../hooks/useWeb3Provider'
import { useContracts } from '../../../contexts/Contracts'

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
	const { contracts } = useContracts()
	const { account } = useWeb3Provider()
	const [nativeBalance, setNativeBalance] = useState<BigNumber>(
		new BigNumber(0),
	)
	const [userLP, setUserLP] = useState<BigNumber>(new BigNumber(0))
	const [claimable, setClaimable] = useState<BigNumber>(new BigNumber(0))

	useEffect(() => {
		if (!contracts || !account) {
			return
		}

		const fetchData = async () => {
			setNativeBalance(
				new BigNumber(
					(
						await contracts.external.multicall.getEthBalance(
							account,
						)
					).toString(),
				),
			)
			setUserLP(
				new BigNumber(
					(
						await contracts.internal['LPMatch'].userLP(account)
					).toString(),
				),
			)

			setClaimable(
				new BigNumber(
					(
						await contracts.internal['LPMatch'].claimable(account)
					).toString(),
				),
			)
		}

		fetchData()
	}, [contracts, account])

	const currency = useMemo(
		() => currencies[`${pool.type.toUpperCase()}_LP`],
		[pool.type],
	)

	const [depositAmount, setDeposit] = useState<string>('')
	const updateDeposit = (value: string) =>
		!isNaN(Number(value)) && setDeposit(value)
	const errorDeposit = useMemo(
		() =>
			new BigNumber(depositAmount).gt(nativeBalance.dividedBy(10 ** 18)),
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
		setDeposit(nativeBalance.dividedBy(10 ** 18).toString() || '0')

	const [withdrawAmount, setWithdraw] = useState<string>('')
	const updateWithdraw = (value: string) =>
		!isNaN(Number(value)) && setWithdraw(value)
	const errorWithdraw = useMemo(
		() => new BigNumber(withdrawAmount).gt(userLP.dividedBy(10 ** 18)),
		[userLP, withdrawAmount],
	)
	const withdrawDisabled = useMemo(
		() =>
			withdrawAmount === '' ||
			new BigNumber(withdrawAmount).isZero() ||
			errorWithdraw,
		[withdrawAmount, errorWithdraw],
	)
	const onMaxWithdraw = () =>
		setWithdraw(userLP?.dividedBy(10 ** 18).toString() || '0')

	const { call: addLiquidity, loading: loadingAddLiquidity } =
		useContractWrite({
			contractName: 'internal.LPMatch',
			method: 'addLiquidityETH',
			description: `addLiquidityETH`,
		})

	const handleAddLiquidity = async () => {
		const { data } = await axios.get(
			'http://40.78.144.189:8000/currentPrice',
		)
		console.log(data)
		await addLiquidity({
			amount: new BigNumber(depositAmount)
				.multipliedBy(10 ** currency.decimals)
				.toString(),
			args: [data.priceAverage, data.blockTimestampLast, data.sig],
			cb: () => setDeposit('0'),
		})
	}

	const { call: handleWithdraw, loading: loadingWithdraw } = useContractWrite(
		{
			contractName: 'internal.LPMatch',
			method: 'withdrawLP',
			description: `withdrawLP`,
		},
	)
	const { call: handleClaim, loading: loadingClaim } = useContractWrite({
		contractName: 'internal.LPMatch',
		method: 'claim',
		description: `claim`,
	})
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
								value={getBalanceNumber(nativeBalance)}
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
								value={getBalanceNumber(userLP)}
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
									nativeBalance.isZero()
								}
								onClickMax={onMaxDeposit}
							/>
						</Form.Item>
						<Button
							disabled={depositDisabled}
							onClick={handleAddLiquidity}
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
								disabled={loadingWithdraw || userLP.isZero()}
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

				<Row gutter={24}>
					<TableHeader value={'Pending Rewards'} span={24} />
					<Col span={24} className={'balance'}>
						<Value
							value={getBalanceNumber(claimable)}
							decimals={2}
							numberSuffix={' NUME'}
						/>
						<Button
							onClick={async () => await handleClaim()}
							loading={loadingClaim}
						>
							Claim Reward
						</Button>
					</Col>
				</Row>
			</div>
		</Card>
	)
}

export default DoubleLiquidity
