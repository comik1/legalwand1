"use client"
import { useState } from "react"
import { FileText, ArrowRight, AlertTriangle, CheckCircle, Info, Upload } from "lucide-react"

const MOCK_CONTRACT_A = `1. Payment Terms: Payment is due within 30 days of invoice.\n2. Confidentiality: Both parties agree to keep information confidential.\n3. Termination: Either party may terminate with 30 days notice.`
const MOCK_CONTRACT_B = `1. Payment Terms: Payment is due within 45 days of invoice.\n2. Confidentiality: Both parties agree to keep information confidential.\n3. Termination: Either party may terminate with 60 days notice.\n4. Data Protection: Both parties will comply with GDPR.`

const MOCK_DIFF = [
  {
    clause: "1. Payment Terms",
    left: "Payment is due within 30 days of invoice.",
    right: "Payment is due within 45 days of invoice.",
    type: "changed",
    risk: "Longer payment window increases cash flow risk.",
  },
  {
    clause: "2. Confidentiality",
    left: "Both parties agree to keep information confidential.",
    right: "Both parties agree to keep information confidential.",
    type: "same",
    risk: null,
  },
  {
    clause: "3. Termination",
    left: "Either party may terminate with 30 days notice.",
    right: "Either party may terminate with 60 days notice.",
    type: "changed",
    risk: "Longer notice period may delay exit from contract.",
  },
  {
    clause: "4. Data Protection",
    left: null,
    right: "Both parties will comply with GDPR.",
    type: "added",
    risk: "New clause: Ensure GDPR compliance is feasible.",
  },
]

const MOCK_SUMMARY = {
  changed: [
    "Payment Terms changed from 30 to 45 days.",
    "Termination notice changed from 30 to 60 days."
  ],
  risky: [
    "Longer payment window increases cash flow risk.",
    "Longer notice period may delay exit from contract."
  ],
  missing: [
    "Data Protection clause missing in Contract A."
  ]
}

export default function ContractComparisonPage() {
  const [contractA, setContractA] = useState(MOCK_CONTRACT_A)
  const [contractB, setContractB] = useState(MOCK_CONTRACT_B)
  const [diff, setDiff] = useState(MOCK_DIFF)
  const [summary, setSummary] = useState(MOCK_SUMMARY)
  const [showResult, setShowResult] = useState(false)
  const [isComparing, setIsComparing] = useState(false)

  // File upload handlers
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, setContract: (v: string) => void) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.type === "text/plain") {
      const text = await file.text()
      setContract(text)
    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setContract("[DOCX file uploaded: " + file.name + "]\n(Parsing not implemented in demo)")
    } else {
      setContract("[Unsupported file type: " + file.name + "]")
    }
  }

  function handleCompare() {
    setIsComparing(true)
    setTimeout(() => {
      setShowResult(true)
      setIsComparing(false)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen w-full">
        <div className="w-full h-full bg-white/90 rounded-3xl shadow-2xl border border-blue-200 flex flex-col gap-10 p-6 md:p-12 xl:p-16 max-w-7xl mx-auto min-h-[80vh]">
          <div className="text-center mb-2 pt-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent mb-1">Contract Comparison</h1>
            <p className="text-base text-blue-600">Upload or select two contracts to compare. See AI-powered clause-by-clause differences and risk highlights.</p>
          </div>
          {/* Upload/select contracts */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-semibold text-blue-700 mb-1">Contract A</label>
              <div className="flex gap-2 mb-2">
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold cursor-pointer hover:bg-blue-200 transition">
                  <Upload className="w-4 h-4" /> Upload File
                  <input
                    type="file"
                    accept=".txt,.docx"
                    className="hidden"
                    onChange={e => handleFileUpload(e, setContractA)}
                  />
                </label>
                <span className="text-xs text-gray-400">or paste below</span>
              </div>
              <textarea
                value={contractA}
                onChange={e => setContractA(e.target.value)}
                rows={8}
                className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base resize-none"
                placeholder="Paste or upload contract A..."
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="font-semibold text-cyan-700 mb-1">Contract B</label>
              <div className="flex gap-2 mb-2">
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan-100 text-cyan-700 font-semibold cursor-pointer hover:bg-cyan-200 transition">
                  <Upload className="w-4 h-4" /> Upload File
                  <input
                    type="file"
                    accept=".txt,.docx"
                    className="hidden"
                    onChange={e => handleFileUpload(e, setContractB)}
                  />
                </label>
                <span className="text-xs text-gray-400">or paste below</span>
              </div>
              <textarea
                value={contractB}
                onChange={e => setContractB(e.target.value)}
                rows={8}
                className="w-full rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:border-cyan-400 transition text-base resize-none"
                placeholder="Paste or upload contract B..."
              />
            </div>
          </div>
          {/* Compare button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={handleCompare}
              disabled={isComparing}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-500 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 flex items-center gap-2 disabled:opacity-60"
            >
              {isComparing ? (
                <span className="flex items-center gap-2 animate-pulse"><ArrowRight className="w-5 h-5" /> Comparing...</span>
              ) : (
                <span className="flex items-center gap-2"><ArrowRight className="w-5 h-5" /> Compare</span>
              )}
            </button>
          </div>
          {/* Visual diff viewer and summary, only after compare */}
          {showResult && <>
            <div className="w-full max-w-5xl mx-auto mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-blue-100 rounded-xl overflow-hidden">
                <div className="bg-blue-50 p-4 border-b md:border-b-0 md:border-r border-blue-100">
                  <div className="font-bold text-blue-700 mb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> Contract A</div>
                  {diff.map((item, idx) => (
                    <div key={idx} className={`mb-4 p-3 rounded-lg ${item.type === "changed" ? "bg-yellow-50 border-l-4 border-yellow-400" : item.type === "added" ? "bg-gray-50" : "bg-white"}`}>
                      <div className="font-semibold text-blue-900">{item.clause}</div>
                      <div className={`text-base ${item.type === "changed" ? "text-yellow-800" : "text-blue-800"}`}>{item.left || <span className="italic text-gray-400">(Not present)</span>}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-cyan-50 p-4">
                  <div className="font-bold text-cyan-700 mb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> Contract B</div>
                  {diff.map((item, idx) => (
                    <div key={idx} className={`mb-4 p-3 rounded-lg ${item.type === "changed" ? "bg-yellow-50 border-l-4 border-yellow-400" : item.type === "added" ? "bg-green-50 border-l-4 border-green-400" : "bg-white"}`}>
                      <div className="font-semibold text-cyan-900">{item.clause}</div>
                      <div className={`text-base ${item.type === "changed" ? "text-yellow-800" : item.type === "added" ? "text-green-800" : "text-cyan-800"}`}>{item.right || <span className="italic text-gray-400">(Not present)</span>}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* AI-powered clause-by-clause comparison and summary */}
            <div className="w-full max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="font-bold text-blue-700 mb-2 flex items-center gap-2"><Info className="w-5 h-5" /> What's Changed?</div>
                <ul className="list-disc pl-5 text-blue-900 text-base">
                  {summary.changed.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                <div className="font-bold text-yellow-700 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> What's Risky?</div>
                <ul className="list-disc pl-5 text-yellow-900 text-base">
                  {summary.risky.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="font-bold text-gray-700 mb-2 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> What's Missing?</div>
                <ul className="list-disc pl-5 text-gray-900 text-base">
                  {summary.missing.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>
  )
}
