"use client"
import { useState } from "react"
import { Download, AlertTriangle, CheckCircle, FileText } from "lucide-react"
import { CONTRACT_TYPES } from "../ai-contract-drafting/page"

const COUNTRIES = [
  { key: "us", label: "United States" },
  { key: "uk", label: "United Kingdom" },
  { key: "eu", label: "European Union" },
  { key: "in", label: "India" },
]

// Mock requirements per subtype and jurisdiction
const MOCK_REQUIREMENTS: Record<string, Record<string, { key: string; label: string; required: boolean }[]>> = {
  // Commercial & Business Operations
  "msa": {
    us: [
      { key: "scope", label: "Scope of Services", required: true },
      { key: "payment", label: "Payment Terms", required: true },
      { key: "liability", label: "Limitation of Liability", required: true },
      { key: "termination", label: "Termination Clause", required: true },
      { key: "governing", label: "Governing Law", required: true },
    ],
  },
  "service": {
    us: [
      { key: "scope", label: "Service Scope", required: true },
      { key: "payment", label: "Payment Terms", required: true },
      { key: "duration", label: "Service Duration", required: true },
      { key: "termination", label: "Termination Clause", required: true },
    ],
  },
  "sow": {
    us: [
      { key: "deliverables", label: "Project Deliverables", required: true },
      { key: "timeline", label: "Timeline", required: true },
      { key: "acceptance", label: "Acceptance Criteria", required: true },
    ],
  },
  "vendor": {
    us: [
      { key: "goods", label: "Goods/Services Description", required: true },
      { key: "payment", label: "Payment Terms", required: true },
      { key: "warranty", label: "Warranty Terms", required: false },
    ],
  },
  "sales": {
    us: [
      { key: "product", label: "Product/Service Description", required: true },
      { key: "price", label: "Price & Payment", required: true },
      { key: "delivery", label: "Delivery Terms", required: true },
    ],
  },
  "distribution": {
    us: [
      { key: "territory", label: "Territory", required: true },
      { key: "product", label: "Product/Service", required: true },
      { key: "commission", label: "Commission Structure", required: false },
    ],
  },
  "licensing": {
    us: [
      { key: "ip", label: "IP Description", required: true },
      { key: "license-fee", label: "License Fee", required: true },
      { key: "term", label: "License Term", required: true },
    ],
  },
  "saas": {
    us: [
      { key: "service", label: "Service Scope", required: true },
      { key: "subscription", label: "Subscription Fee", required: true },
      { key: "uptime", label: "Uptime Guarantee", required: false },
    ],
  },
  "tech-licensing": {
    us: [
      { key: "technology", label: "Technology Description", required: true },
      { key: "royalty", label: "Royalty Terms", required: true },
      { key: "term", label: "License Term", required: true },
    ],
  },
  // Employment & HR
  "employment": {
    us: [
      { key: "position", label: "Position & Duties", required: true },
      { key: "compensation", label: "Compensation Terms", required: true },
      { key: "at-will", label: "At-Will Employment", required: true },
      { key: "confidentiality", label: "Confidentiality Clause", required: false },
    ],
  },
  // Financial & Investment
  "loan": {
    us: [
      { key: "amount", label: "Loan Amount", required: true },
      { key: "interest", label: "Interest Rate", required: true },
      { key: "repayment", label: "Repayment Terms", required: true },
    ],
  },
  "promissory": {
    us: [
      { key: "principal", label: "Principal Amount", required: true },
      { key: "maturity", label: "Maturity Date", required: true },
      { key: "interest", label: "Interest Rate", required: false },
    ],
  },
  "term-sheet": {
    us: [
      { key: "investment", label: "Investment Amount", required: true },
      { key: "valuation", label: "Valuation", required: true },
      { key: "investor", label: "Investor Name", required: true },
    ],
  },
  // Confidentiality & Miscellaneous
  "nda-mutual": {
    us: [
      { key: "definition", label: "Definition of Confidential Information", required: true },
      { key: "term", label: "Term of Confidentiality", required: true },
      { key: "remedies", label: "Remedies for Breach", required: false },
    ],
  },
  "nda-unilateral": {
    us: [
      { key: "definition", label: "Definition of Confidential Information", required: true },
      { key: "term", label: "Term of Confidentiality", required: true },
    ],
  },
  "mou": {
    us: [
      { key: "purpose", label: "Purpose of MoU", required: true },
      { key: "key-terms", label: "Key Terms", required: true },
    ],
  },
  // Foundational & Corporate Governance
  "founders": {
    us: [
      { key: "vesting", label: "Vesting Schedule", required: true },
      { key: "roles", label: "Founder Roles", required: true },
      { key: "equity", label: "Equity Split", required: true },
    ],
  },
  "shareholders": {
    us: [
      { key: "share-classes", label: "Share Classes", required: true },
      { key: "voting", label: "Voting Rights", required: true },
    ],
  },
  "articles": {
    us: [
      { key: "state", label: "State of Incorporation", required: true },
      { key: "agent", label: "Registered Agent", required: true },
    ],
  },
  "bylaws": {
    us: [
      { key: "board", label: "Board Structure", required: true },
      { key: "quorum", label: "Quorum Requirements", required: true },
    ],
  },
  // Equity & Startup
  "safe": {
    us: [
      { key: "investment", label: "Investment Amount", required: true },
      { key: "valuation-cap", label: "Valuation Cap", required: true },
      { key: "discount", label: "Discount Rate", required: false },
    ],
  },
};

// Dummy checklist fallback
const DUMMY_REQUIREMENTS: Requirement[] = [
  { key: "dummy1", label: "Sample Compliance Item 1", required: true },
  { key: "dummy2", label: "Sample Compliance Item 2", required: false },
  { key: "dummy3", label: "Sample Compliance Item 3", required: true },
];

type CountryType = typeof COUNTRIES[number]["key"]
type Subtype = {
  key: string;
  label: string;
  icon?: any;
  description?: string;
}
type Requirement = {
  key: string;
  label: string;
  required: boolean;
}

export default function ComplianceChecklistPage() {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedSubtype, setSelectedSubtype] = useState<Subtype | null>(null)
  const [country, setCountry] = useState<CountryType>("us")
  const [checked, setChecked] = useState<{ [key: string]: boolean }>({})

  // Get subtypes for selected type
  const subtypes: Subtype[] = selectedType ? (CONTRACT_TYPES.find((t: any) => t.key === selectedType)?.subtypes ?? []) : []

  // Defensive: always default to [] and check array before mapping
  const requirements: Requirement[] =
    (selectedSubtype &&
      MOCK_REQUIREMENTS[selectedSubtype.key] &&
      Array.isArray(MOCK_REQUIREMENTS[selectedSubtype.key][country]))
      ? MOCK_REQUIREMENTS[selectedSubtype.key][country]
      : [];

  const totalRequired = requirements.filter(r => r.required).length
  const checkedRequired = requirements.filter(r => r.required && checked[r.key])
  const complianceScore = totalRequired === 0 ? 0 : Math.round((checkedRequired.length / totalRequired) * 100)
  const missing = requirements.filter(r => r.required && !checked[r.key])

  function handleCheck(key: string) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleExport() {
    alert("Exporting compliance report as PDF (mock)")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen w-full -mt-5">
        <div className="w-full h-full bg-white/90 rounded-3xl shadow-2xl border border-blue-200 flex flex-col gap-8 p-6 md:p-12 xl:p-16 max-w-5xl mx-auto min-h-[80vh]">
          <div className="text-center mb-2 pt-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-1">Compliance Checklist</h1>
            <p className="text-base text-blue-600">Auto-generated checklist based on contract type and jurisdiction. Track compliance and export your report.</p>
          </div>
          {/* Step 1: Select contract type (dropdown) */}
          <div className="w-full max-w-2xl mx-auto">
            <label className="block font-semibold text-blue-700 mb-2">Contract Type</label>
            <select
              className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base"
              value={selectedType}
              onChange={e => { setSelectedType(e.target.value); setSelectedSubtype(null); setStep(1); }}
            >
              <option value="" disabled>Select contract type...</option>
              {CONTRACT_TYPES.map((type: any) => (
                <option key={type.key} value={type.key}>{type.label}</option>
              ))}
            </select>
          </div>
          {/* Step 2: Select subtype (dropdown, if available) */}
          {step >= 1 && subtypes.length > 0 && (
            <div className="w-full max-w-2xl mx-auto">
              <label className="block font-semibold text-blue-700 mb-2">Subtype</label>
              <select
                className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base"
                value={selectedSubtype?.key || ""}
                onChange={e => {
                  const sub = subtypes.find(s => s.key === e.target.value) || null;
                  setSelectedSubtype(sub);
                  setChecked({});
                  setStep(2);
                }}
              >
                <option value="" disabled>Select subtype...</option>
                {subtypes.map(sub => (
                  <option key={sub.key} value={sub.key}>{sub.label}</option>
                ))}
              </select>
            </div>
          )}
          {/* Step 3: Select jurisdiction (dropdown) */}
          {step >= 2 && selectedSubtype && (
            <div className="w-full max-w-2xl mx-auto">
              <label className="block font-semibold text-blue-700 mb-2">Jurisdiction</label>
              <select
                className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base"
                value={country}
                onChange={e => { setCountry(e.target.value as CountryType); setStep(3); }}
              >
                {COUNTRIES.map(c => (
                  <option key={c.key} value={c.key}>{c.label}</option>
                ))}
              </select>
            </div>
          )}
          {/* Step 4: Checklist */}
          {step === 3 && selectedSubtype && (
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700 text-lg">Checklist for {selectedSubtype.label} ({COUNTRIES.find(c => c.key === country)?.label})</span>
                <span className="ml-auto text-sm text-gray-500">Compliance Score: <span className="font-bold text-blue-700">{complianceScore}%</span></span>
              </div>
              <ul className="divide-y divide-blue-100 bg-blue-50 rounded-xl border border-blue-200">
                {(!Array.isArray(requirements) || requirements.length === 0
                  ? DUMMY_REQUIREMENTS
                  : requirements
                ).map(req => (
                  <li key={req.key} className="flex items-center gap-3 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!checked[req.key]}
                      onChange={() => handleCheck(req.key)}
                      className="w-5 h-5 accent-blue-600 border-blue-300 rounded focus:ring-2 focus:ring-blue-200"
                      id={req.key}
                    />
                    <label htmlFor={req.key} className={`flex-1 text-base ${req.required ? "font-medium text-blue-900" : "text-gray-500"}`}>{req.label} {req.required ? "*" : "(optional)"}</label>
                    {checked[req.key] ? (
                      <CheckCircle className="w-5 h-5 text-cyan-500" />
                    ) : req.required ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    ) : null}
                  </li>
                ))}
              </ul>
              {missing.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 flex items-center gap-3 mt-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  <div className="text-yellow-800 text-base">
                    <b>Warning:</b> Missing required compliance elements: {missing.map(m => m.label).join(", ")}
                  </div>
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-500 text-white font-bold text-base shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-5 h-5" /> Export Compliance Report (PDF)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
