import {
	EthereumConfig,
	EthereumCurrenciesConfig,
	EthereumExternalConfig,
	EthereumExternalPoolsConfig,
} from '../../type/ethereum'

const currencies: EthereumCurrenciesConfig = {
	ERC20: {
		crv: '0xd533a949740bb3306d119cc777fa900ba034cd52',
		wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
		link: '0x514910771af9ca656af840dff83e8264ecf986ca',
		mim: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3',
		cvx: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
		yax: '0xb1dc9124c395c1e97773ab855d66e879f053a289',
		usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
		dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
		usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
		'3crv': '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
		weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
		mvlt: '0xBFbEC72F2450eF9Ab742e4A27441Fa06Ca79eA6a',
		spell: '0x090185f2135308bad17527004364ebcc2d37e5f6',
		frax: '0x853d955acef822db058eb8505911ed77f175b99e',
		nume: '0x34769d3e122c93547836addd3eb298035d68f1c3',
	},
	ERC677: {
		yaxis: '0x0adA190c81b814548ddC2F6AdC4a689ce7C1FE73',
	},
}

const external: EthereumExternalConfig = {
	multicall: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
	pickleChef: '0xbD17B1ce622d73bD438b9E658acA5996dc394b0d',
	pickleJar: '0x1BB74b5DdC1f4fC91D6f9E7906cf68bc93538e33',
	uniswapRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
	gaugeController: '0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB',
}

const externalPools: EthereumExternalPoolsConfig = {
	curve: {
		mim3crv: {
			currency: 'usd',
			pool: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B',
			token: '0x5a6A4D54456819380173272A5E8E9B9904BdF41B',
			gauge: '0xd8b712d29381748dB89c36BCa0138d7c75866ddF',
			convexRewards: '0xFd5AbF66b003881b88567EB9Ed9c651F14Dc4771',
			extraRewards: {
				spell: {
					contract: '0x69a92f1656cd2e193797546cFe2EaF32EACcf6f7',
					token: '0x090185f2135308bad17527004364ebcc2d37e5f6',
				},
			},
		},
		alethcrv: {
			currency: 'eth',
			pool: '0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e',
			token: '0xC4C319E2D4d66CcA4464C0c2B32c9Bd23ebe784e',
			gauge: '0x12dCD9E8D1577b5E4F066d8e7D404404Ef045342',
			convexRewards: '0x48Bc302d8295FeA1f8c3e7F57D4dDC9981FEE410',
		},
		'3pool': {
			currency: 'usd',
			pool: '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7',
			token: '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490',
			gauge: '0xbFcF63294aD7105dEa65aA58F8AE5BE2D9d0952A',
			convexRewards: '0x689440f2Ff927E1f24c72F1087E1FAF471eCe1c8',
		},
		crvcvxeth: {
			currency: 'usd',
			pool: '0xB576491F1E6e5E62f1d8F26062Ee822B40B0E0d4',
			token: '0x3A283D9c08E8b55966afb64C515f5143cf907611',
			gauge: '0x7E1444BA99dcdFfE8fBdb42C02F0005D14f13BE1',
			convexRewards: '0xb1Fb0BA0676A1fFA83882c7F4805408bA232C1fA',
			extraRewards: {
				cvx: {
					contract: '0x834B9147Fd23bF131644aBC6e557Daf99C5cDa15',
					token: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
				},
			},
		},
		crv3crypto: {
			currency: 'usd',
			pool: '0xD51a44d3FaE010294C616388b506AcdA1bfAAE46',
			token: '0xc4AD29ba4B3c580e6D59105FFf484999997675Ff',
			gauge: '0xDeFd8FdD20e0f34115C7018CCfb655796F6B2168',
			convexRewards: '0x9D5C5E364D81DaB193b72db9E9BE9D8ee669B652',
		},
		frax3crv: {
			currency: 'usd',
			pool: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B',
			token: '0xd632f22692FaC7611d2AA1C0D552930D43CAEd3B',
			gauge: '0x72e158d38dbd50a483501c24f792bdaaa3e7d55c',
			convexRewards: '0xB900EF131301B307dB5eFcbed9DBb50A3e209B2e',
		},
	},
}

const mainnet: EthereumConfig = {
	internal: {
		// Current
		manager: '0xec5CdD1a415bE0b1d513cc420e4fC80CA3ca7590',
		controller: '0x6dB53Ed036135f2c299d54353b2ae7e748a85628',
		vaultHelper: '0x00085a3568E0C01Ce528806ad5456dF36eB29aD4',
		minter: '0x335aa59eFa4c8bA8B9ce36de18B19D088B180c21',
		minterWrapper: '0x1731fe39EE77db5aB75484Ac6590C016E5801058',
		stableSwap3PoolConverter: '0x2eab685d85AA52E4d8b6699Ba5aAC3b0c3992C3B',
		votingEscrow: '0xa770697cecA9Af6584aA59DD9F226eaF6Cd0c2dc',
		gaugeController: '0x65c83006eBda35229FC61AE5cba1048F83eA5ebF',
		feeDistributor: '0xcdF55d76f7de152b3E5dfd220D9214A2C1B5FdF6',
		// Legacy
		merkleDistributor: '0xd0c9432625a181c823b3e63d5e6656f87231ae96',
		swap: '0xCdF398537adbF8617a8401B14DCEe7F67CF8c64b',
		yaxisChef: '0xc330e7e73717cd13fb6ba068ee871584cf8a194f',
		xYaxStaking: '0xeF31Cb88048416E301Fee1eA13e7664b887BA7e8',
		yAxisMetaVault: '0xBFbEC72F2450eF9Ab742e4A27441Fa06Ca79eA6a',
		LPMatch: '0x47E3C646bc4CfE7a051a57858DC07719E6fbD5E2',
	},
	rewards: {
		MetaVault: '0x226f9954A1221cDe805C76CfB312A5d761630E14',
		Yaxis: '0x3b09B9ADFe11f92225b4C55De89fa81456595CD9',
		'Uniswap NUME/ETH': '0x7a7E3C997897F0AbE4E1bcd1231eE763820db1e0', //TODO LP REWARDS CONTRACT
	},
	vaults: {
		usd: {
			url: 'https://curve.fi/mim/deposit',
			tokenPoolContract: externalPools.curve.mim3crv.pool,
			token: 'MIM3CRV',
			tokenContract: externalPools.curve.mim3crv.token,
			vault: '0x9353d11eF99b8703D58FeAf69591DA62d6d6324e',
			vaultToken: 'CV:USD',
			vaultTokenContract: '0x024A3cE04706fe3dEC5EFAE904b4980bC1cD508a',
			gauge: '0xb9E28267eB119D07fc2c3bFC63D4b53Ff6C2C778',
		},
		eth: {
			url: 'https://curve.fi/factory/38/deposit',
			tokenPoolContract: externalPools.curve.alethcrv.pool,
			token: 'ALETHCRV',
			tokenContract: externalPools.curve.alethcrv.token,
			vault: '0xf31c6eE97070dcc73781c7C9d45EC9b5E86D2912',
			vaultToken: 'CV:ETH',
			vaultTokenContract: '0x1fa16627E468501fBa70e39a056d83A59539CE97',
			gauge: '0xCfF87237de72fb25342210c02B25983713B613Fe',
		},
		cvx: {
			url: 'https://curve.fi/cvxeth/deposit',
			tokenPoolContract: externalPools.curve.crvcvxeth.pool,
			token: 'CRVCVXETH',
			tokenContract: externalPools.curve.crvcvxeth.token,
			vault: '0x1014A2e3de1C4d6C5998D7e5a264F22a35d2cACc',
			vaultToken: 'CV:CVX',
			vaultTokenContract: '0x6eC48d8f290136CEA599f0707eB7323DF6ED6d4c',
			gauge: '0x7789f7f28152Ec48a4d35141decCE08CE83D69E8',
		},
		tricrypto: {
			url: 'https://curve.fi/tricrypto2/deposit',
			tokenPoolContract: externalPools.curve.crv3crypto.pool,
			token: 'CRV3CRYPTO',
			tokenContract: externalPools.curve.crv3crypto.token,
			vault: '0x1d9DC26A9067DA6C8e6038eBF176b7eB3E394149',
			vaultToken: 'CV:TRICRYPTO',
			vaultTokenContract: '0x3C2C88B0532f3C1f8d1F5dC348EC663ED0713448',
			gauge: '0x2941F68fe10c16C8d710F4C51De91a82d7e89BE2',
		},
		frax: {
			url: 'https://curve.fi/frax/deposit',
			tokenPoolContract: externalPools.curve.frax3crv.pool,
			token: 'FRAX3CRV',
			tokenContract: externalPools.curve.frax3crv.token,
			vault: '0x428F5B8b8fE7b9247c09aDE2cbd7573A3BfF649D',
			vaultToken: 'CV:FRAX',
			vaultTokenContract: '0xE3218f652205554a1c3b1d7595bce4c70a3B634C',
			gauge: '0xce399Bf99df1B2dE66DeE8a100280Bb49D2Ee0af',
		},
	},
	pools: {
		'Uniswap NUME/ETH': {
			active: true,
			legacy: false,
			type: 'uniswap',
			liquidId: `${currencies.ERC20.nume}/ETH`,
			lpAddress: '0xF06550C34946D251C2EACE59fF4336168dB7EbF2',
			lpUrl: 'https://app.uniswap.org/#/add/v2/ETH/0x34769D3e122C93547836AdDD3eb298035D68F1C3?chain=mainnet',
			lpTokens: [
				{
					tokenId: 'nume',
				},
				{
					tokenId: 'eth',
				},
			],
			tokenAddress: currencies.ERC677.yaxis,
			name: 'Uniswap NUME/ETH',
			symbol: 'NUME/ETH UNI-V2 LP',
			tokenSymbol: 'NUME_ETH_UNISWAP_LP',
			icon: '',
			rewards: 'Uniswap NUME/ETH',
		},
		'LP Double Up Program (Invite Only)': {
			pid: 6,
			active: false,
			legacy: false,
			type: 'uniswap',
			liquidId: `${currencies.ERC20.yax}/ETH`,
			lpAddress: '0xA5c9Eb48392d253EC7337f72af3b4d1a03666695',
			lpUrl: '',
			lpTokens: [
				{
					tokenId: 'yax',
				},
				{
					tokenId: 'eth',
				},
			],
			tokenAddress: currencies.ERC20.yax,
			name: 'LP Double Up Program (Invite Only)',
			symbol: 'YAX/ETH UNI-V2 LP',
			tokenSymbol: 'YAX_ETH_UNISWAP_LP',
			icon: '',
		},
	},
	currencies,
	external,
	externalPools,
}

export default mainnet
