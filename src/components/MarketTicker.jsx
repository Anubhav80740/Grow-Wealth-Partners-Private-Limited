// ─── MarketTicker ─────────────────────────────────────────────────
// Scrolling market data strip shown only on the Home page,
// fixed just below the navbar. Pauses on hover.

const TICKERS = [
  { name: "SENSEX",   price: "75,318.39", change: "+0.16%", up: true  },
  { name: "NIFTY 50", price: "22,906.25", change: "+0.21%", up: true  },
  { name: "BANKEX",   price: "64,972.87", change: "-0.11%", up: false },
  { name: "BSE100",   price: "22,348.48", change: "+0.00%", up: true  },
  { name: "NIFTY IT", price: "38,142.10", change: "+0.84%", up: true  },
  { name: "MIDCAP",   price: "49,231.60", change: "-0.37%", up: false },
  { name: "NIFTY BANK", price: "48,720.55", change: "+0.29%", up: true },
  { name: "SMALLCAP", price: "15,874.90", change: "+0.52%", up: true  },
  { name: "NIFTY FMCG", price: "54,010.30", change: "-0.09%", up: false },
  { name: "AUTO",     price: "23,105.75", change: "+0.63%", up: true  },
];

// Duplicate the list so the loop is seamless
const ITEMS = [...TICKERS, ...TICKERS];

export default function MarketTicker() {
  return (
    <div className="ticker-wrap" aria-label="Live market data">
      <div className="ticker-fade-left" />
      <div className="ticker-fade-right" />
      <div className="ticker-track">
        {ITEMS.map((t, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{t.name}</span>
            <span className="ticker-price">{t.price}</span>
            <span className={t.up ? "ticker-up" : "ticker-down"}>
              {t.up ? "↑" : "↓"} {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
