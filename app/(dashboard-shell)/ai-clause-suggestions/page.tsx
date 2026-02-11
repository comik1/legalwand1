"use client"
import { useState } from "react"
import { Copy, ArrowRight, RefreshCw, Info } from "lucide-react"

const CLAUSE_CATEGORIES = [
  { key: "indemnity", label: "Indemnity" },
  { key: "termination", label: "Termination" },
  { key: "ip", label: "Intellectual Property" },
  { key: "confidentiality", label: "Confidentiality" },
  { key: "governing-law", label: "Governing Law" },
  { key: "warranty", label: "Warranty" },
  { key: "liability", label: "Limitation of Liability" },
]

const TONES = [
  { key: "strict", label: "Strict" },
  { key: "neutral", label: "Neutral" },
  { key: "friendly", label: "Friendly" },
]

const MOCK_SUGGESTIONS = {
  indemnity: {
    strict: "The Contractor shall indemnify and hold harmless the Company from any and all claims, damages, or liabilities arising out of the Contractor's performance.",
    neutral: "Each party agrees to indemnify the other against losses resulting from breaches of this agreement.",
    friendly: "We'll each cover our own mistakes and help each other out if any issues arise from this contract.",
  },
  termination: {
    strict: "Either party may terminate this Agreement with immediate effect upon material breach by the other party.",
    neutral: "This Agreement may be terminated by either party with thirty (30) days written notice.",
    friendly: "If things aren't working out, either of us can end this agreement with a quick heads-up."
  },
  ip: {
    strict: "All intellectual property developed under this Agreement shall be the sole property of the Company.",
    neutral: "Intellectual property created during this engagement will be owned as agreed by both parties.",
    friendly: "Anything we create together belongs to both of us, unless we agree otherwise."
  },
  confidentiality: {
    strict: "The Recipient shall not disclose any Confidential Information to any third party without prior written consent.",
    neutral: "Both parties agree to keep confidential information private and not share it without permission.",
    friendly: "Let's keep each other's secrets safe and not share them unless we both say it's okay."
  },
  "governing-law": {
    strict: "This Agreement shall be governed by and construed in accordance with the laws of the State of [Jurisdiction], without regard to its conflict of law principles.",
    neutral: "The laws of [Jurisdiction] will apply to this Agreement.",
    friendly: "We'll follow the rules of [Jurisdiction] if any issues come up."
  },
  warranty: {
    strict: "The Company makes no warranties, express or implied, regarding the services provided.",
    neutral: "Each party represents that it will perform its obligations in good faith.",
    friendly: "We promise to do our best, but can't guarantee everything will be perfect."
  },
  liability: {
    strict: "In no event shall either party be liable for any indirect, incidental, or consequential damages.",
    neutral: "Liability is limited to direct damages only.",
    friendly: "If something goes wrong, we'll work together to fix it, but won't be responsible for things outside our control."
  },
}

type CategoryKey = keyof typeof MOCK_SUGGESTIONS

export default function AIClauseSuggestionsPage() {
  const [currentClause, setCurrentClause] = useState("")
  const [category, setCategory] = useState<CategoryKey>("indemnity")
  const [tone, setTone] = useState<"strict" | "neutral" | "friendly">("neutral")
  const [suggestedClause, setSuggestedClause] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showWhy, setShowWhy] = useState(false)

  function handleGenerate() {
    setIsLoading(true)
    setTimeout(() => {
      setSuggestedClause(MOCK_SUGGESTIONS[category][tone])
      setIsLoading(false)
    }, 800)
  }

  function handleCopy() {
    if (!suggestedClause) return
    navigator.clipboard.writeText(suggestedClause)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  function handleReplace() {
    if (!suggestedClause) return
    setCurrentClause(suggestedClause)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen w-full ">
        <div className="w-full h-full bg-white/90 rounded-3xl shadow-2xl border border-blue-200 flex flex-col gap-8 p-6 md:p-12 xl:p-16 max-w-5xl mx-auto ">
          <div className="text-center mb-2 pt-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-1">AI Clause Suggestion</h1>
            <p className="text-base text-blue-600">Paste a clause, select a category and tone, and get an AI-powered alternative instantly.</p>
          </div>

          {/* Step 1: Clause Input */}
          <div>
            <label className="block font-semibold text-blue-700 mb-2 text-base">Clause to Improve</label>
            <textarea
              value={currentClause}
              onChange={e => setCurrentClause(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base resize-none"
              placeholder="Paste or type your clause here..."
            />
          </div>

          {/* Step 2: Category & Tone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="font-semibold text-blue-700 mb-1">Category</div>
              <div className="flex gap-2 flex-wrap">
                {CLAUSE_CATEGORIES.map(c => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCategory(c.key as CategoryKey)}
                    className={`px-4 py-2 rounded-full font-medium text-sm border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-200 ${category === c.key ? "bg-blue-600 text-white border-blue-600 shadow" : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"}`}
                    aria-pressed={category === c.key}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-cyan-700 mb-1">Tone</div>
              <div className="flex gap-2 flex-wrap">
                {TONES.map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTone(t.key as any)}
                    className={`px-4 py-2 rounded-full font-medium text-sm border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-200 ${tone === t.key ? "bg-cyan-500 text-white border-cyan-500 shadow" : "bg-white text-cyan-700 border-cyan-200 hover:bg-cyan-50"}`}
                    aria-pressed={tone === t.key}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-500 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2"><RefreshCw className="animate-spin w-5 h-5" /> Generating...</span>
            ) : (
              <span className="flex items-center gap-2">Generate Suggestion <ArrowRight className="w-5 h-5" /></span>
            )}
          </button>

          {/* Step 4: Result */}
          {suggestedClause && (
            <div className="mt-2 bg-white/95 rounded-2xl border border-cyan-200 shadow-lg p-6 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h4 className="font-bold text-blue-700 mb-2 text-base flex items-center gap-1">Current Clause</h4>
                  <div className="min-h-[60px] rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-900 text-base whitespace-pre-wrap break-words">
                    {currentClause ? currentClause : <span className="text-blue-300">(No clause provided)</span>}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-cyan-700 mb-2 text-base flex items-center gap-1">AI Suggestion</h4>
                  <div className="min-h-[60px] rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-cyan-900 text-base whitespace-pre-wrap break-words">
                    {suggestedClause}
                  </div>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={handleCopy}
                      disabled={!suggestedClause}
                      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-150 ${copied ? "bg-green-100 text-green-700" : "bg-cyan-100 text-cyan-700 hover:bg-cyan-200"} disabled:opacity-50`}
                    >
                      <Copy className="w-4 h-4" /> {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      onClick={handleReplace}
                      disabled={!suggestedClause}
                      className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold flex items-center gap-2 hover:bg-blue-200 disabled:opacity-50"
                    >
                      <ArrowRight className="w-4 h-4" /> Replace Original
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-cyan-700 hover:underline focus:outline-none"
                  onClick={() => setShowWhy(v => !v)}
                >
                  <Info className="w-4 h-4" /> Why this suggestion?
                </button>
                {showWhy && (
                  <div className="mt-2 text-sm text-cyan-700 bg-cyan-50 border border-cyan-100 rounded-lg p-4">
                    This suggestion is generated based on your selected category and tone, using best practices for clear, enforceable, and fair contract language. For production, this would include an AI-generated rationale or legal explanation.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
