import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { CryptoStatsSDK } from "@cryptostats/sdk";

type Protocol = {
  id: number,
  result: number
}

// Dashboard page component
const Dashboard = () => {

  const moralisKey = "7fd1e7ef047a764836b4cbd1";

  const tokens = [
    { name: "Dai", address: "0x6b175474e89094c44da98b954eedeac495271d0f" },
    { name: "USDC", address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" },
    { name: "USDT", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" }
  ];

  const fetchCryptoStats = async (): Promise<Array<Protocol>> => {
    const apys : Protocol[] = [];

    const sdk = new CryptoStatsSDK({ moralisKey });
    const list = sdk.getList("apy");
    await list.fetchAdapters();

    for (const token of tokens) {
      const result = await list.executeQuery("currentAPY", token.address);

      // document.write(`<div>APY for ${token.name}:</div>`);

      const formattedResults = result.map((protocol : Protocol) => ({
        id: protocol.id,
        result: (protocol.result * 100).toFixed(2)
      }));

      apys.push(formattedResults);
      // for (const protocol of result) {
      //   apys.push(protocol);
      //   // document.write(
      //   //   `<div>${protocol.id}: ${(protocol.result * 100).toFixed(2)}%</div>`
      //   // );
      // }
    }
    return apys;
  };

  const apys = fetchCryptoStats()
    .then(response => response[0].id)
    .catch(error => console.log(error.message));

  // Render post title and content in the page from props
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container color="white" maxW="100%" px="6%" className="test">
        <div>{(!apys || apys.length ==0) ? "WOW" : apys.map((protocol : any) => (protocol.id))}</div>
      </Container>
    </>
  )
}
export default Dashboard;