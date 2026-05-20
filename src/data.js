// ─── Static data used across multiple pages ───────────────────────

export const FUNDS = [
  { id:1, name:"Axis Bluechip Fund", amc:"Axis", category:"Large Cap", returns3y:"15.2%", returns1y:"21.4%", aum:"₹32,450 Cr", min:"₹500", stars:"★★★★★", risk:"low", color:"#22c55e" },
  { id:2, name:"ICICI Pru Technology Fund", amc:"ICICI", category:"Sectoral", returns3y:"22.8%", returns1y:"38.1%", aum:"₹15,230 Cr", min:"₹500", stars:"★★★★☆", risk:"high", color:"#f59e0b" },
  { id:3, name:"Mirae Asset Large Cap", amc:"Mirae", category:"Large Cap", returns3y:"18.5%", returns1y:"24.3%", aum:"₹28,900 Cr", min:"₹500", stars:"★★★★★", risk:"low", color:"#3b82f6" },
  { id:4, name:"SBI Small Cap Fund", amc:"SBI", category:"Small Cap", returns3y:"25.3%", returns1y:"42.7%", aum:"₹19,670 Cr", min:"₹500", stars:"★★★★☆", risk:"high", color:"#8b5cf6" },
  { id:5, name:"Parag Parikh Flexi Cap", amc:"PPFAS", category:"Flexi Cap", returns3y:"19.7%", returns1y:"28.9%", aum:"₹45,120 Cr", min:"₹500", stars:"★★★★★", risk:"mod", color:"#ec4899" },
  { id:6, name:"Kotak Emerging Equity", amc:"Kotak", category:"Mid Cap", returns3y:"20.1%", returns1y:"31.5%", aum:"₹12,890 Cr", min:"₹500", stars:"★★★★☆", risk:"mod", color:"#14b8a6" },
  { id:7, name:"HDFC Top 100 Fund", amc:"HDFC", category:"Large Cap", returns3y:"16.8%", returns1y:"23.1%", aum:"₹22,340 Cr", min:"₹500", stars:"★★★★☆", risk:"low", color:"#f97316" },
  { id:8, name:"Nippon India Growth Fund", amc:"Nippon", category:"Mid Cap", returns3y:"23.4%", returns1y:"37.2%", aum:"₹18,760 Cr", min:"₹100", stars:"★★★★★", risk:"mod", color:"#06b6d4" },
];

export const HOLDINGS = [
  { fund:"Axis Bluechip Fund", units:"124.5", invested:"₹50,000", current:"₹62,340", returns:"+24.7%", change:"pos" },
  { fund:"Parag Parikh Flexi Cap", units:"89.2", invested:"₹35,000", current:"₹44,810", returns:"+28.0%", change:"pos" },
  { fund:"ICICI Pru Technology", units:"45.8", invested:"₹20,000", current:"₹27,620", returns:"+38.1%", change:"pos" },
  { fund:"SBI Small Cap Fund", units:"210.3", invested:"₹40,000", current:"₹38,200", returns:"-4.5%", change:"neg" },
];

export const TXS = [
  { date:"12 May 2026", fund:"Axis Bluechip Fund", type:"buy", amount:"₹5,000", units:"9.82" },
  { date:"05 May 2026", fund:"SIP – Parag Parikh", type:"buy", amount:"₹3,000", units:"5.21" },
  { date:"28 Apr 2026", fund:"ICICI Pru Technology", type:"redeem", amount:"₹10,000", units:"18.4" },
  { date:"12 Apr 2026", fund:"Axis Bluechip Fund", type:"buy", amount:"₹5,000", units:"9.75" },
  { date:"05 Apr 2026", fund:"SIP – Parag Parikh", type:"buy", amount:"₹3,000", units:"5.18" },
];

export const SIP_PLANS = [
  { name:"Wealth Builder SIP", desc:"Invest regularly in diversified equity funds. Build long-term wealth with disciplined monthly investments.", min:"₹500", category:"Equity", risk:"Moderate" },
  { name:"Tax Saver SIP", desc:"Save taxes under Section 80C while growing wealth. Lock-in of 3 years with ELSS funds.", min:"₹500", category:"ELSS", risk:"Moderate-High" },
  { name:"Debt SIP", desc:"Stable returns with lower risk. Ideal for short-to-medium term goals like emergency corpus.", min:"₹1,000", category:"Debt", risk:"Low" },
  { name:"Index SIP", desc:"Mirror Nifty 50 or Sensex with ultra-low expense ratios. Passive investing at its best.", min:"₹100", category:"Index", risk:"Moderate" },
  { name:"Small Cap SIP", desc:"High growth potential for long-term investors. Invest in emerging companies with strong fundamentals.", min:"₹500", category:"Small Cap", risk:"High" },
  { name:"Hybrid SIP", desc:"Balanced allocation between equity and debt. Ideal for investors seeking growth with stability.", min:"₹500", category:"Hybrid", risk:"Moderate" },
];
