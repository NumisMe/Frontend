import { ChainId } from '../../chains'

import kovan from './kovan'
import goerli from './goerli'
import mainnet from './mainnet'

const ethereum = {
	[ChainId.ETHEREUM_KOVAN]: kovan,
	[ChainId.ETHEREUM_GOERLI]: goerli,
	[ChainId.ETHEREUM_MAINNET]: mainnet,
}

export default ethereum
