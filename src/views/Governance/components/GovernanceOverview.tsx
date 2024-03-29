import React from 'react'
import Typography from '../../../components/Typography'
import Value from '../../../components/Value'
import CardRow from '../../../components/CardRow'
import useTranslation from '../../../hooks/useTranslation'
import { ExpandableSidePanel } from '../../../components/ExpandableSidePanel'
import { useNumeSupply } from '../../../state/internal/hooks'
import { useVotingPower } from '../../../state/wallet/hooks'

const { SecondaryText } = Typography

const GovernanceOverview: React.FC = () => {
	const translate = useTranslation()

	const { circulating } = useNumeSupply()

	const { supply } = useVotingPower()

	return (
		<ExpandableSidePanel
			header={'Staking Overview'}
			icon="book"
		>
			<CardRow
				main={<SecondaryText>NUME locked in Governance</SecondaryText>}
				secondary={
					<Value
						numberSuffix="%"
						value={supply
							?.dividedBy(circulating)
							.multipliedBy(100)
							.toNumber()}
						decimals={2}
					/>
				}
				last
			/>
		</ExpandableSidePanel>
	)
}

export { GovernanceOverview }
