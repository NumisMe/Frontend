import { ExpandableSidePanel } from '../../../components/ExpandableSidePanel'
import { useTVL } from '../../../state/internal/hooks'
import CardRow from '../../../components/CardRow'
import Value from '../../../components/Value'
import useTranslation from '../../../hooks/useTranslation'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Rewards() {

    const [totalReward, setTotalReward] = useState(0);

    useEffect(()=>{
		axios
		.get('https://numisme-bots.herokuapp.com/')
		.then(res => {
			console.log(res.data);
			setTotalReward(parseFloat(res.data));
		})
		.catch(error => {
			console.error(error);
		});
	}, []);
    
	return (
		<ExpandableSidePanel
			header={'Total ETH Distributed'}
			icon="vault"
		>
			<CardRow
				main={'Total WETH Distributed'}
				secondary={
					<Value
                        value={totalReward.toFixed(3)}
                        decimals={3}
                        suffix={" WETH"}
                    />
				}
				last
			/>
		</ExpandableSidePanel>
	)
}
