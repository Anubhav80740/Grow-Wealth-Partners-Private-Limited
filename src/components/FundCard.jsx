// ─── FundCard ─────────────────────────────────────────────────────
// Reusable card used on both HomePage (preview) and MutualFundsPage.

const riskMap   = { low: "risk-low", mod: "risk-mod", high: "risk-high" };
const riskLabel = { low: "Low Risk",  mod: "Moderate",  high: "High Risk" };

export default function FundCard({ fund }) {
  return (
    <div className="fund-card">
      <div className="fund-header">
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <div className="fund-logo" style={{ background: fund.color }}>
            {fund.amc.slice(0, 2)}
          </div>
          <div>
            <div className="fund-name">{fund.name}</div>
            <div className="fund-category">{fund.category}</div>
          </div>
        </div>
        <div className="fund-stars">{fund.stars}</div>
      </div>

      <div className="fund-metrics">
        <div>
          <div className="fund-metric-label">3Y Returns</div>
          <div className="fund-metric-val green">{fund.returns3y}</div>
        </div>
        <div>
          <div className="fund-metric-label">1Y Returns</div>
          <div className="fund-metric-val green">{fund.returns1y}</div>
        </div>
        <div>
          <div className="fund-metric-label">AUM</div>
          <div className="fund-metric-val">{fund.aum}</div>
        </div>
      </div>

      <div className="fund-footer">
        <div className="fund-min">Min: <span>{fund.min}</span></div>
        <span className={`risk-badge ${riskMap[fund.risk]}`}>{riskLabel[fund.risk]}</span>
      </div>
    </div>
  );
}
