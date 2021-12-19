import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  font-size: 30px;
  display: block;
`;

const Overview = styled.div`
  margin-top: 20px;
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(3, 1fr);
`;

const OverviewItem = styled.div`
  width: 100%;
  height: 50px;
  background-color: #282e46;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const OverviewTitle = styled.div`
  font-size: 0.4rem;
  color: lightgray;
  opacity: 0.5;
  margin-top: 5px;
`;

const OverviewContent = styled.div`
  font-size: 1.4rem;
  margin-top: 1px;
`;

const Toggle = styled.div`
  margin-top: 5px;
  grid-gap: 5px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ToggleItem = styled(OverviewItem)`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  color: lightgray;
  height: 30px;
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: Date;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: Date;
  last_data_at: Date;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
}

export interface Quotes {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<InfoData>();
  // const [price, setPriceInfo] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);-
  //   })();
  // }, [coinId]);

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading Coin Data...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <OverviewTitle>RANK</OverviewTitle>
              <OverviewContent>{infoData?.rank}</OverviewContent>
            </OverviewItem>
            <OverviewItem>
              <OverviewTitle>SYMBOL</OverviewTitle>
              <OverviewContent>{infoData?.symbol}</OverviewContent>
            </OverviewItem>
            <OverviewItem>
              <OverviewTitle>PRICE</OverviewTitle>
              <OverviewContent>
                {`$${
                  Math.floor((tickersData?.quotes.USD.price ?? 0) * 100) / 100
                }`}
              </OverviewContent>
            </OverviewItem>
          </Overview>
          <Toggle>
            <ToggleItem>
              <Link to={{ pathname: `/${infoData?.name}/chart` }}>CHART</Link>
            </ToggleItem>
            <ToggleItem>PRICE</ToggleItem>
          </Toggle>
        </>
      )}
    </Container>
  );
}
export default Coin;
