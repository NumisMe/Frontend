/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Result, Card, Statistic, Row, Col, Button, Grid } from 'antd';
import { formatEther } from 'ethers/lib/utils';
import useWeb3Provider from '../../hooks/useWeb3Provider'
import { ethers } from 'ethers';
import abi from './abi.json'
import Page from '../../components/Page'
import styled from 'styled-components'

declare var window: any
const { ethereum } = window;

const StyledCol = styled(Col)`
	@media only screen and (max-width: 991px) {
		margin-top: 16px;
	}
`

const { useBreakpoint } = Grid

const Home = () => {
  const { account } = useWeb3Provider()
  let tokenSwap;
  const [allocation, setAllocation] = useState(0);
  const [claimable, setClaimable] = useState(0);

  useEffect(() => {
    if(!tokenSwap) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        tokenSwap = new ethers.Contract("0x48a6516c3dB55cda6557a94AbD6f6c30f5D3dcD0", abi, signer);
    }
    if (!tokenSwap || !account) {
      return;
    }

    const work = async () => {
        setAllocation(await tokenSwap.allocations(account));
        setClaimable(await tokenSwap.claimable(account));
    };

    work();
  }, [tokenSwap, account]);

  const claim = async () => {
    if (!tokenSwap) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        tokenSwap = new ethers.Contract("0x48a6516c3dB55cda6557a94AbD6f6c30f5D3dcD0", abi, signer);
    }
    console.log("h2");
    await tokenSwap.claim();
  };

  if (!account) {
    return (
      <Result
        status="warning"
        title="Please connect to your wallet to claim."
      />
    );
  }

  console.log(claimable);
  const { lg } = useBreakpoint()
  return (
    <div className={'home-view'}>
        <Page>
            <Row gutter={lg ? 16 : 0}>
                <Col md={24} lg={16} className={'home-left'}>
                    <Card
                        style={{ width: '100%' }}
                        title="Claim token"
                        actions={[
                            <Button type="primary" onClick={claim}>
                            Claim
                            </Button>,
                        ]}
                        >
                        <Row gutter={16}>
                            <Col span={12}>
                            <Statistic
                                title="Allocations"
                                value={formatEther(allocation)}
                                precision={2}
                            />
                            </Col>
                            <Col span={12}>
                            <Statistic
                                title="Claimable"
                                value={formatEther(claimable)}
                                precision={2}
                            />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <StyledCol xs={24} sm={24} md={24} lg={8}>
                    
                </StyledCol>
            </Row>
        </Page>
    </div>
  );
};

export default Home;