const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1';

async function fetchTopCryptoPrices() {
  const response = await fetch(COINGECKO_URL);

  if (!response.ok) {
    throw new Error(`CoinGecko API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function formatPrice(price) {
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatChange(change) {
  const value = change ?? 0;
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function printTable(coins) {
  const rows = coins.map((coin) => ({
    Name: coin.name,
    Price: formatPrice(coin.current_price),
    '24h Change': formatChange(coin.price_change_percentage_24h),
  }));

  console.table(rows);
}

async function main() {
  try {
    const coins = await fetchTopCryptoPrices();
    printTable(coins);
  } catch (error) {
    console.error('Failed to fetch crypto prices:', error.message);
    process.exit(1);
  }
}

main();
