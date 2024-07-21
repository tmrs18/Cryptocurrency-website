const chartContainer = document.getElementById('chartContainer');
const cryptoListElement = document.getElementById('cryptoList');
let selectedCrypto = null;

async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();

        const cryptocurrencies = [
            { id: 'BTCUSDT', name: 'Bitcoin', price: 'Loading...' },
            { id: 'ETHUSDT', name: 'Ethereum', price: 'Loading...' },
            { id: 'USDT', name: 'Tether', price: 'Loading...' },
            { id: 'BNBUSDT', name: 'BNB', price: 'Loading...' },
            { id: 'SOLUSDT', name: 'Solana', price: 'Loading...' },
            { id: 'ADAUSDT', name: 'Cardano', price: 'Loading...' },
            { id: 'DOTUSDT', name: 'Polkadot', price: 'Loading...' },
            { id: 'XRPUSDT', name: 'Ripple', price: 'Loading...' },
            { id: 'DOGEUSDT', name: 'Dogecoin', price: 'Loading...' },
            { id: 'LTCUSDT', name: 'Litecoin', price: 'Loading...' },
            { id: 'LINKUSDT', name: 'Chainlink', price: 'Loading...' },
            { id: 'BCHUSDT', name: 'Bitcoin Cash', price: 'Loading...' },
            { id: 'ATOMUSDT', name: 'Cosmos', price: 'Loading...' },
            { id: 'ETCUSDT', name: 'Ethereum Classic', price: 'Loading...' },
            { id: 'XMRUSDT', name: 'Monero', price: 'Loading...' },
            { id: 'TRXUSDT', name: 'TRON', price: 'Loading...' },
            { id: 'VETUSDT', name: 'VeChain', price: 'Loading...' },
            { id: 'EOSUSDT', name: 'EOS', price: 'Loading...' },
            { id: 'IOTAUSDT', name: 'IOTA', price: 'Loading...' },
            { id: 'XTZUSDT', name: 'Tezos', price: 'Loading...' },
            { id: 'THETAUSDT', name: 'Theta', price: 'Loading...' },
            { id: 'XLMUSDT', name: 'Stellar', price: 'Loading...' },
            { id: 'FILUSDT', name: 'Filecoin', price: 'Loading...' },
            { id: 'ALGOUSDT', name: 'Algorand', price: 'Loading...' },
            { id: 'BATUSDT', name: 'Basic Attention Token', price: 'Loading...' },
            { id: 'ZECUSDT', name: 'Zcash', price: 'Loading...' },
            { id: 'DASHUSDT', name: 'Dash', price: 'Loading...' },
            { id: 'UNIUSDT', name: 'Uniswap', price: 'Loading...' },
            { id: 'SNXUSDT', name: 'Synthetix', price: 'Loading...' },
            { id: 'COMPUSDT', name: 'Compound', price: 'Loading...' },
            { id: 'MKRUSDT', name: 'Maker', price: 'Loading...' },
            { id: 'AAVEUSDT', name: 'Aave', price: 'Loading...' },
            { id: 'YFIUSDT', name: 'yearn.finance', price: 'Loading...' },
            { id: 'SUSHIUSDT', name: 'SushiSwap', price: 'Loading...' },
            { id: 'CRVUSDT', name: 'Curve DAO Token', price: 'Loading...' },
            { id: 'GRTUSDT', name: 'The Graph', price: 'Loading...' },
            { id: 'MANAUSDT', name: 'Decentraland', price: 'Loading...' },
            { id: 'ENJUSDT', name: 'Enjin Coin', price: 'Loading...' },
            { id: 'RLCUSDT', name: 'Refereum', price: 'Loading...' },
            { id: 'CHZUSDT', name: 'Chiliz', price: 'Loading...' },
            { id: 'ANKRUSDT', name: 'Ankr', price: 'Loading...' },
            { id: 'BATUSDT', name: 'Basic Attention Token', price: 'Loading...' },
            { id: 'IOSTUSDT', name: 'IOST', price: 'Loading...' },
            { id: 'RVNUSDT', name: 'Ravencoin', price: 'Loading...' },
            { id: 'DGBUSDT', name: 'DigiByte', price: 'Loading...' },
            { id: 'XEMUSDT', name: 'NEM', price: 'Loading...' },
            { id: 'ZRXUSDT', name: '0x', price: 'Loading...' },
            { id: 'KNCUSDT', name: 'Kyber Network', price: 'Loading...' },
            { id: 'LSKUSDT', name: 'Lisk', price: 'Loading...' },
            { id: 'SCUSDT', name: 'Siacoin', price: 'Loading...' },
            { id: 'STORJUSDT', name: 'Storj', price: 'Loading...' },
            { id: 'XVGUSDT', name: 'Verge', price: 'Loading...' },
            { id: 'SYSUSDT', name: 'Syscoin', price: 'Loading...' }
        ];

        const cryptoElements = cryptocurrencies.map(crypto => {
            return `
                <div class="crypto" id="${crypto.id}">
                    <div class="crypto-name">${crypto.name}</div>
                    <div class="crypto-price">${crypto.price}</div>
                </div>
            `;
        }).join('');

        cryptoListElement.innerHTML = cryptoElements;

        return cryptocurrencies.map(crypto => crypto.id);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function updateCryptoPrices() {
    const cryptoIds = await fetchCryptoPrices();

    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();

        cryptoIds.forEach(id => {
            const crypto = data.find(item => item.symbol === id);
            if (crypto) {
                const cryptoElem = document.getElementById(id);
                cryptoElem.querySelector('.crypto-price').textContent = `$${parseFloat(crypto.lastPrice).toFixed(2)}`;
            }
        });
    } catch (error) {
        console.error('Error updating prices:', error);
    }
}

async function fetchHistoricalData(symbol) {
    try {
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=10`);
        const data = await response.json();

        const prices = data.map(item => parseFloat(item[4]));

        return prices;
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
    }
}

function renderChart(prices) {
    if (chartContainer && prices) {
        const options = {
            chart: {
                type: 'line',
                height: 300,
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
            },
            series: [
                {
                    name: 'Price',
                    data: prices
                }
            ],
            xaxis: {
                type: 'datetime',
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: 'MMM \'yy',
                        day: 'dd MMM',
                        hour: 'HH:mm'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return `$${value.toFixed(2)}`;
                    }
                }
            }
        };

        const chart = new ApexCharts(chartContainer, options);
        chart.render();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.crypto').forEach(crypto => {
        crypto.addEventListener('click', async () => {
            const symbol = crypto.id.toUpperCase();
            selectedCrypto = symbol;

            const prices = await fetchHistoricalData(symbol);
            renderChart(prices);
        });
    });

    // Initial update of crypto prices
    updateCryptoPrices();
    // Update prices every 10 seconds
    setInterval(updateCryptoPrices, 10000);
});
