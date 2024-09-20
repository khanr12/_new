import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import peFunctions from './peFunctions';

const functionDescriptions = {
  'deal-sourcing': `Deal sourcing and screening is a critical first step in the private equity investment process. It involves identifying and evaluating potential investment opportunities that align with the firm's investment strategy and criteria. This process typically begins with extensive market research, leveraging industry reports, financial databases, and proprietary networks to uncover promising companies. Private equity firms often employ a combination of proactive outreach, intermediary relationships, and inbound inquiries to build a robust pipeline of potential deals.

Once potential targets are identified, the screening process begins. This involves a preliminary analysis of the company's financial performance, market position, growth potential, and overall fit with the firm's investment thesis. Analysts will review key metrics such as revenue growth, profitability margins, market share, and competitive landscape. They also assess the company's management team, business model, and potential for value creation through operational improvements or strategic initiatives. This initial screening helps filter out unsuitable opportunities and allows the firm to focus its resources on the most promising prospects for further due diligence.`,

  'due-diligence': `Due diligence is a comprehensive and intensive investigation process that private equity firms undertake before making an investment decision. It serves as a critical risk management tool, allowing investors to verify information, uncover potential issues, and validate their investment thesis. The due diligence process typically encompasses several key areas: financial, legal, operational, and commercial.

Financial due diligence involves a detailed examination of the target company's historical financial statements, accounting practices, and financial projections. This includes analyzing revenue recognition policies, cost structures, working capital requirements, and cash flow patterns. Legal due diligence focuses on reviewing contracts, assessing regulatory compliance, examining pending litigation, and identifying any potential legal risks. Operational due diligence evaluates the company's business processes, IT systems, supply chain, and overall operational efficiency. This often involves site visits and interviews with key personnel. Commercial due diligence assesses the company's market position, competitive landscape, customer relationships, and growth opportunities. This may include customer interviews, market surveys, and industry expert consultations. The findings from these various streams of due diligence are synthesized to form a comprehensive understanding of the investment opportunity and its associated risks and potential returns.`,

  'valuation': `Valuation and financial modeling are crucial components of the private equity investment process, providing a framework for determining the worth of a potential investment and projecting its future performance. The valuation process typically employs multiple methodologies to arrive at a range of potential values for the target company. Common approaches include Discounted Cash Flow (DCF) analysis, which estimates the present value of projected future cash flows; comparable company analysis, which benchmarks the target against similar public companies; and precedent transactions analysis, which examines recent M&A deals in the same industry.

Financial modeling involves creating detailed projections of the company's future financial performance. This typically includes building integrated financial statements (income statement, balance sheet, and cash flow statement) based on a set of assumptions about the company's operations, market conditions, and potential value creation initiatives. Private equity firms often develop multiple scenarios (base case, upside case, downside case) to understand the range of potential outcomes. These models also incorporate the proposed deal structure, including leverage and any planned operational improvements or strategic initiatives. The financial model serves as a tool for sensitivity analysis, allowing investors to understand how changes in key variables might impact returns. It also forms the basis for determining the appropriate purchase price and structuring the deal terms.`,

  'deal-structuring': `Deal structuring and negotiation in private equity involve determining the optimal terms of the investment and reaching an agreement with the seller. This process requires balancing the interests of multiple stakeholders, including the private equity firm, its limited partners, the target company's management, and any co-investors or lenders involved in the transaction. Key considerations in deal structuring include the mix of equity and debt financing, governance rights, management incentives, and exit provisions.

The capital structure of the deal is a critical component, typically involving a combination of equity from the PE firm and its co-investors, along with debt financing from banks or other lenders. The amount of leverage used can significantly impact potential returns and risk. Governance rights are another crucial aspect, defining how much control the PE firm will have over major decisions and the composition of the board of directors. Management incentives, such as equity stakes or performance-based bonuses, are often incorporated to align the interests of the company's leadership with those of the new owners. Exit provisions, including drag-along and tag-along rights, are also typically negotiated to facilitate a future sale of the company. The negotiation process often involves multiple rounds of offers and counteroffers, with terms being refined based on due diligence findings and changing market conditions. Successful deal structuring requires not only financial acumen but also strong negotiation skills and a deep understanding of industry norms and legal considerations.`,

  'portfolio-management': `Portfolio management in private equity involves overseeing and optimizing the performance of acquired companies to maximize their value. This phase is where much of the value creation in private equity occurs, transforming the initial investment thesis into tangible results. The portfolio management process typically begins immediately after the deal closes, with the implementation of a 100-day plan that outlines key priorities and quick wins. This often includes initiatives to improve operational efficiency, strengthen the management team, and pursue strategic growth opportunities.

Throughout the holding period, which typically lasts 3-7 years, the private equity firm works closely with the portfolio company's management team to drive performance improvements. This may involve various value creation levers such as revenue growth initiatives, cost reduction programs, working capital optimization, and strategic add-on acquisitions. Regular performance monitoring is crucial, with portfolio companies typically reporting detailed financial and operational metrics on a monthly or quarterly basis. The PE firm may also provide support in key areas such as recruiting top talent, improving IT systems, or entering new markets. As the investment matures, the focus shifts towards preparing the company for exit, which may involve further growth initiatives, margin improvements, or strategic repositioning to maximize attractiveness to potential buyers.`,

  'exit-strategies': `Exit strategies are a critical component of the private equity investment cycle, as they determine how and when the firm will realize returns on its investment. The choice of exit strategy depends on various factors, including market conditions, the company's performance and growth prospects, and the overall economic environment. The three primary exit routes in private equity are Initial Public Offerings (IPOs), strategic sales, and secondary buyouts.

An IPO involves listing the portfolio company on a public stock exchange, allowing the PE firm to sell its shares to public market investors. This option can potentially yield high returns and provides a partial exit with the opportunity to sell remaining shares over time. However, IPOs also come with increased regulatory scrutiny and ongoing reporting requirements. A strategic sale, or trade sale, involves selling the company to a strategic buyer, often a competitor or a company in a related industry looking to expand or integrate vertically. This option can often command a premium price due to potential synergies. Secondary buyouts, where the company is sold to another private equity firm, have become increasingly common. This option can be attractive when the company still has significant growth potential that aligns better with another PE firm's expertise or investment horizon. Throughout the holding period, PE firms continuously evaluate exit opportunities, adjusting their strategy based on the company's performance and market conditions. Preparation for exit often begins well in advance, with initiatives to enhance the company's attractiveness to potential buyers or public market investors.`,

  'investor-relations': `Investor relations and fundraising are vital functions for private equity firms, focusing on managing relationships with limited partners (LPs) and securing capital for new funds. This process is ongoing, with firms typically raising new funds every 3-5 years while simultaneously managing existing investor relationships. Effective investor relations involve regular, transparent communication with LPs, providing updates on fund performance, portfolio company developments, and market insights. This often includes quarterly reports, annual meetings, and ad hoc communications for significant events.

The fundraising process itself is complex and time-consuming, often taking 12-18 months to complete. It begins with developing a compelling investment thesis and track record presentation. Firms then embark on a roadshow, meeting with potential investors to pitch their strategy and demonstrate their value creation capabilities. This involves not only showcasing past performance but also articulating a clear vision for future investments. Target LPs typically include pension funds, endowments, foundations, sovereign wealth funds, and high-net-worth individuals. Due diligence by potential investors is rigorous, examining the firm's track record, investment process, team stability, and operational capabilities. Successful fundraising requires not only strong past performance but also a differentiated strategy, a stable and experienced team, and robust operational infrastructure. As the private equity industry has matured, LPs have become increasingly sophisticated, demanding greater transparency, better alignment of interests, and in some cases, more favorable economic terms.`,

  'market-analysis': `Market and industry analysis is a fundamental aspect of private equity investing, crucial for identifying attractive sectors, understanding competitive dynamics, and spotting emerging trends. This process involves both broad macroeconomic analysis and deep dives into specific industries and sub-sectors. At the macro level, PE firms analyze economic indicators, demographic trends, regulatory environments, and technological disruptions that could create investment opportunities or risks. This helps in identifying sectors poised for growth or consolidation.

At the industry level, analysis typically employs frameworks such as Porter's Five Forces to assess competitive intensity, barriers to entry, supplier and customer power, and the threat of substitutes. Firms also conduct extensive primary and secondary research, including expert interviews, customer surveys, and analysis of industry reports. This deep understanding of industry dynamics helps in identifying potential acquisition targets, assessing their competitive position, and developing value creation strategies. Market analysis also plays a crucial role in the due diligence process, validating assumptions about a target company's market position and growth potential. Furthermore, ongoing market analysis throughout the holding period of an investment helps portfolio companies adapt to changing conditions and identify new growth opportunities. As private equity firms increasingly specialize in specific sectors, developing deep industry expertise has become a key differentiator in sourcing deals, creating value, and ultimately generating superior returns.`,

  'risk-assessment': `Risk assessment and management are critical functions in private equity, integral to every stage of the investment process from deal sourcing to exit. The goal is to identify, evaluate, and mitigate potential risks that could impact the success of an investment. This process begins during the initial screening of potential deals, where firms assess risks related to the target company's business model, market position, and financial health. During due diligence, a more comprehensive risk assessment is conducted, examining financial, operational, legal, regulatory, and market risks in detail.

Once an investment is made, ongoing risk management becomes a key part of portfolio management. This involves regular monitoring of key risk indicators, stress testing financial projections under various scenarios, and implementing mitigation strategies where necessary. Common risks in private equity investments include execution risk (the ability to implement value creation plans), market risk (changes in economic conditions or competitive landscape), financial risk (related to leverage and cash flow), and exit risk (the ability to sell the investment at the desired time and value). Environmental, Social, and Governance (ESG) risks have also become increasingly important, with many PE firms incorporating ESG considerations into their investment process and portfolio management practices. Effective risk management in private equity requires a combination of quantitative analysis, industry expertise, and sound judgment. It's not about avoiding all risks, but rather about understanding and selectively taking risks that are appropriately compensated by potential returns. Sophisticated PE firms often have dedicated risk management teams and employ advanced analytics and scenario planning tools to enhance their risk assessment capabilities.`
};

const FunctionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const functionName = peFunctions.find(f => f.id === id)?.name || 'Unknown Function';
  const description = functionDescriptions[id] || 'Description not available.';
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for RAG process
    setAiResponse(`RAG-based response for "${userInput}" will be generated here.`);
    setUserInput('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-blue-400 hover:text-blue-300">&larr; Back to Dashboard</Link>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-blue-400">{functionName}</h1>
        <div className="bg-gray-800 rounded-md p-6 mb-8">
          <div className="text-gray-300 mb-4 leading-relaxed">
            {description.split('\n\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                {index < description.split('\n\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 rounded-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">AI Assistant</h2>
          <p className="text-gray-300 mb-4">
            This AI Assistant uses Retrieval-Augmented Generation (RAG) to provide insights and answers related to {functionName}. 
            RAG combines the power of a large language model with a specialized knowledge base, allowing for more accurate and 
            context-aware responses.
          </p>
          <p className="text-gray-300 mb-4">
            The assistant draws data from a vector database containing specific information about private equity practices, 
            market trends, and historical data. It can provide analysis, answer questions, and offer recommendations based on 
            this curated knowledge.
          </p>
          <p className="text-gray-300 mb-4">
            Multiple AI agents specializing in different aspects of private equity can collaborate to provide comprehensive insights. 
            These agents can interact with each other to cross-reference information and provide well-rounded answers to complex queries.
          </p>
          <form onSubmit={handleSubmit} className="mt-6">
            <textarea
              className="w-full p-2 text-gray-800 bg-gray-200 rounded-md"
              rows="4"
              value={userInput}
              onChange={handleInputChange}
              placeholder={`Enter your question about ${functionName} here...`}
            ></textarea>
            <button 
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {aiResponse && (
            <div className="mt-4 p-4 bg-gray-700 rounded-md">
              <h3 className="text-xl font-semibold mb-2 text-blue-300">AI Response:</h3>
              <p className="text-gray-300">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionPage;