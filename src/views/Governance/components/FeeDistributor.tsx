import React from 'react'

import ClaimFees from '../../../components/ClaimFees'
import Card from '../../../components/Card'
import useTranslation from '../../../hooks/useTranslation'
import Rewards from '../../Vault/components/Rewards'

const FeeDistributor: React.FC = () => {
	const translate = useTranslation()
	return (
		<>
			<Card title={'Revenue Share'} icon="verticalbars">
				<ClaimFees />
			</Card>
			<Card>
				<Rewards />
			</Card>
		</>
	)
}

export default FeeDistributor
