"use client"
import { useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, FileText, Wand2, CheckCircle2, XCircle, Download } from "lucide-react"

const MOCK_CONTRACT = `This Employment Agreement is made between [Employer] and [Employee]. The Employee agrees to perform duties as assigned. Compensation will be paid monthly. Confidentiality must be maintained. Termination may occur with two weeks' notice. The Employee is entitled to health benefits.`

const MOCK_ISSUES = [
  {
    type: "risk",
    start: 0,
    end: 28,
    text: "Missing non-compete clause.",
    suggestion: "Consider adding a non-compete clause to protect business interests.",
  },
  {
    type: "ambiguous",
    start: 61,
    end: 110,
    text: "'as assigned' is ambiguous.",
    suggestion: "Specify the duties more clearly to avoid confusion.",
  },
  {
    type: "missing",
    start: 180,
    end: 210,
    text: "No severance terms.",
    suggestion: "Add severance terms for clarity on termination conditions.",
  },
]

const ISSUE_COLORS = {
  risk: "bg-red-100 text-red-700 border-red-300",
  ambiguous: "bg-yellow-100 text-yellow-800 border-yellow-300",
  missing: "bg-blue-100 text-blue-800 border-blue-300",
}
const ISSUE_ICONS = {
  risk: AlertTriangle,
  ambiguous: Wand2,
  missing: FileText,
}

export default function AIContractReviewPage() {
  const [contractText, setContractText] = useState("")
  const [issues, setIssues] = useState<any[]>([])
  const [showReview, setShowReview] = useState(false)
  const [activeIssue, setActiveIssue] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // For demo, just use mock contract
    setContractText(MOCK_CONTRACT)
    setShowReview(false)
  }

  function handlePaste() {
    setContractText(MOCK_CONTRACT)
    setShowReview(false)
  }

  function handleReview() {
    setIssues(MOCK_ISSUES)
    setShowReview(true)
  }

  function handleAccept(index: number) {
    setIssues(issues.filter((_, i) => i !== index))
    setActiveIssue(null)
  }

  function handleIgnore(index: number) {
    setActiveIssue(null)
  }

  // Highlight contract text with issues
  function renderHighlightedText() {
    if (!showReview || !issues.length) return contractText;
    let lastIndex = 0;
    const elements = [];
    issues.forEach((issue, idx) => {
      if (lastIndex < issue.start) {
        elements.push(
          <span key={"plain-" + idx}>{contractText.slice(lastIndex, issue.start)}</span>
        );
      }
      const Icon = ISSUE_ICONS[issue.type];
      elements.push(
        <span
          key={"issue-" + idx}
          className={`border-b-2 cursor-pointer ${ISSUE_COLORS[issue.type]} px-1 rounded transition-all duration-200`}
          onMouseEnter={() => setActiveIssue(idx)}
          onMouseLeave={() => setActiveIssue(null)}
          style={{ position: "relative" }}
        >
          {contractText.slice(issue.start, issue.end)}
          {/* Popover */}
          {activeIssue === idx && (
            <span
              className="absolute z-50 mt-2 ml-2 p-4 bg-white border rounded-xl shadow-xl min-w-[260px] max-w-xs text-sm flex flex-col gap-2 animate-fade-in"
              style={{ left: 0, top: "100%" }}
            >
              <span className="flex items-center gap-2 font-semibold">
                {Icon ? (
                  <span className="inline-block">
                    <Icon className="w-4 h-4" />
                  </span>
                ) : null}
                {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)}
              </span>
              <span className="text-gray-700">{issue.text}</span>
              <span className="text-blue-700 font-medium">Suggestion: {issue.suggestion}</span>
              <div className="flex gap-2 mt-2">
                <Button size="sm" className="bg-green-600 text-white" onClick={() => handleAccept(idx)}><CheckCircle2 className="w-4 h-4 mr-1" /> Accept</Button>
                <Button size="sm" variant="outline" onClick={() => handleIgnore(idx)}><XCircle className="w-4 h-4 mr-1" /> Ignore</Button>
              </div>
            </span>
          )}
        </span>
      );
      lastIndex = issue.end;
    });
    if (lastIndex < contractText.length) {
      elements.push(
        <span key="plain-end">{contractText.slice(lastIndex)}</span>
      );
    }
    // Always wrap in a fragment to ensure valid JSX
    return <>{elements}</>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[80vh] items-stretch bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-16">
      {/* Left: Input & Summary */}
      <div className="flex-1 flex flex-col gap-6 max-w-lg mx-auto lg:mx-0">
        <Card className="bg-white/90 shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold">
              <Wand2 className="text-blue-600" /> AI Contract Review
            </CardTitle>
            <p className="text-gray-600 mt-2">Upload or paste your contract. Let AI highlight risks, missing clauses, and ambiguous language.</p>
          </CardHeader>
          <CardContent>
            {/* File Upload */}
            <div className="flex flex-col gap-3 mb-4">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
                <FileText className="w-4 h-4 mr-2" /> Upload Contract File
              </Button>
              <Button variant="ghost" className="w-full text-blue-600" onClick={handlePaste}>
                Paste Example Contract
              </Button>
            </div>
            {/* Textarea */}
            <Textarea
              rows={8}
              placeholder="Or paste your contract text here..."
              value={contractText}
              onChange={e => setContractText(e.target.value)}
              className="mb-4"
            />
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md"
              onClick={handleReview}
              disabled={!contractText.trim()}
            >
              Review with AI
            </Button>
          </CardContent>
        </Card>
        {/* Findings Summary */}
        {showReview && (
          <Card className="bg-gradient-to-br from-blue-100/60 to-cyan-100/40 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <AlertTriangle className="text-red-500" /> Summary of Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {issues.length === 0 && <li className="text-green-700 font-semibold flex items-center gap-2"><CheckCircle2 />No issues detected!</li>}
                {issues.map((issue, idx) => {
                  const Icon = ISSUE_ICONS[issue.type];
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      {Icon ? (
                        <span className="mt-1">
                          <Icon className="w-4 h-4" />
                        </span>
                      ) : null}
                      <span>
                        <span className="font-semibold capitalize">{issue.type}:</span> {issue.text}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Right: Review Panel */}
      <div className="flex-1 flex flex-col">
        <Card className="h-full bg-white/80 shadow-xl border-0 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Wand2 className="w-6 h-6 text-blue-600" /> Contract Review Panel
            </CardTitle>
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">AI Review</Badge>
          </CardHeader>
          <CardContent>
            <div className="relative min-h-[300px] p-2">
              {showReview ? renderHighlightedText() : <span className="text-gray-400">Upload or paste a contract and click 'Review with AI' to see results here.</span>}
            </div>
          </CardContent>
        </Card>
        {showReview && (
          <div className="flex gap-4 mt-4">
            <Button variant="outline" className="border-blue-600 text-blue-700 font-semibold flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Reviewed Contract
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
