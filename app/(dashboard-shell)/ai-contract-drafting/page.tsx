"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Briefcase, ShieldCheck, Users, Download, Save, Layers, UserCheck, BookOpen, DollarSign, Lock, Star } from "lucide-react"

// Contract types and subtypes
export const CONTRACT_TYPES = [
  {
    key: "foundational",
    label: "Foundational & Corporate Governance",
    icon: Users,
    description: "For company formation and governance.",
    subtypes: [
      { key: "founders", label: "Founders Agreement", icon: Users, description: "For startup founders." },
      { key: "shareholders", label: "Shareholders Agreement", icon: Users, description: "For company shareholders." },
      { key: "articles", label: "Articles of Incorporation", icon: BookOpen, description: "For company registration." },
      { key: "bylaws", label: "Bylaws / Operating Agreement", icon: BookOpen, description: "For company rules." },
    ],
  },
  {
    key: "commercial",
    label: "Commercial & Business Operations",
    icon: Layers,
    description: "For business deals and operations.",
    subtypes: [
      { key: "msa", label: "Master Service Agreement (MSA)", icon: Layers, description: "For ongoing services." },
      { key: "service", label: "Service Agreement", icon: Layers, description: "For client/vendor services." },
      { key: "sow", label: "Statement of Work (SOW)", icon: FileText, description: "For project deliverables." },
      { key: "vendor", label: "Vendor/Supplier Agreement", icon: Users, description: "For suppliers." },
      { key: "sales", label: "Sales Agreement", icon: DollarSign, description: "For sales transactions." },
      { key: "distribution", label: "Distribution Agreement", icon: Layers, description: "For product distribution." },
      { key: "licensing", label: "Licensing Agreement (IP/Software/Content)", icon: Star, description: "For IP/software/content." },
      { key: "saas", label: "SaaS Agreement", icon: Star, description: "For SaaS products." },
      { key: "tech-licensing", label: "Technology Licensing Agreement", icon: Star, description: "For technology licensing." },
    ],
  },
  {
    key: "employment",
    label: "Employment & HR",
    icon: UserCheck,
    description: "For hiring and HR.",
    subtypes: [
      { key: "employment", label: "Employment Agreement", icon: Briefcase, description: "For hiring employees." },
    ],
  },
  {
    key: "financial",
    label: "Financial & Investment",
    icon: DollarSign,
    description: "For loans and investments.",
    subtypes: [
      { key: "loan", label: "Loan Agreement", icon: DollarSign, description: "For lending money." },
      { key: "promissory", label: "Promissory Note", icon: DollarSign, description: "For debt promises." },
      { key: "term-sheet", label: "Term Sheet (for Investment)", icon: DollarSign, description: "For investment terms." },
    ],
  },
  {
    key: "confidentiality",
    label: "Confidentiality & Miscellaneous",
    icon: Lock,
    description: "For NDAs and MoUs.",
    subtypes: [
      { key: "nda-mutual", label: "NDA – Mutual", icon: Lock, description: "Mutual NDA." },
      { key: "nda-unilateral", label: "NDA – Unilateral", icon: Lock, description: "One-way NDA." },
      { key: "mou", label: "Memorandum of Understanding (MoU)", icon: FileText, description: "For MoUs." },
    ],
  },
  {
    key: "equity",
    label: "Equity & Startup",
    icon: DollarSign,
    description: "For startup equity.",
    subtypes: [
      { key: "safe", label: "SAFE (Simple Agreement for Future Equity)", icon: DollarSign, description: "For startup investment." },
    ],
  },
]

const TEMPLATE_FIELDS: Record<string, string[]> = {
  founders: ["Founder Names", "Equity Split", "Vesting Schedule"],
  shareholders: ["Shareholder Names", "Share Classes", "Voting Rights"],
  articles: ["Company Name", "State of Incorporation", "Registered Agent"],
  bylaws: ["Company Name", "Board Structure", "Quorum Requirements"],
  msa: ["Client Name", "Service Description", "Payment Terms", "Term"],
  service: ["Service Provider", "Client Name", "Service Scope", "Payment Terms"],
  sow: ["Project Name", "Deliverables", "Timeline", "Payment Terms"],
  vendor: ["Vendor Name", "Goods/Services", "Payment Terms"],
  sales: ["Seller Name", "Buyer Name", "Product/Service", "Price"],
  distribution: ["Distributor Name", "Product/Service", "Territory", "Commission"],
  licensing: ["Licensor", "Licensee", "IP Description", "License Fee"],
  saas: ["Provider Name", "Customer Name", "Service Scope", "Subscription Fee"],
  "tech-licensing": ["Licensor", "Licensee", "Technology Description", "Royalty Terms"],
  employment: ["Employee Name", "Employer Name", "Position", "Salary", "Start Date"],
  loan: ["Lender Name", "Borrower Name", "Loan Amount", "Interest Rate", "Term"],
  promissory: ["Borrower Name", "Lender Name", "Principal Amount", "Maturity Date"],
  "term-sheet": ["Company Name", "Investor Name", "Investment Amount", "Valuation"],
  "nda-mutual": ["Party A", "Party B", "Purpose", "Term"],
  "nda-unilateral": ["Discloser", "Recipient", "Purpose", "Term"],
  mou: ["Party A", "Party B", "Purpose", "Key Terms"],
  safe: ["Investor Name", "Company Name", "Investment Amount", "Valuation Cap", "Discount Rate"],
};

const DEFAULT_FORM: Record<string, Record<string, string>> = {};
CONTRACT_TYPES.forEach(type => {
  type.subtypes.forEach(sub => {
    DEFAULT_FORM[sub.key] = {};
    (TEMPLATE_FIELDS[sub.key] || []).forEach((field: string) => {
      DEFAULT_FORM[sub.key][field] = "";
    });
  });
});

export default function AIContractDraftingPage() {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, Record<string, string>>>(DEFAULT_FORM)
  const [preview, setPreview] = useState("")

  function generatePreview(form: Record<string, Record<string, string>>, templateKey: string) {
    return `Contract Type: ${CONTRACT_TYPES.flatMap(t => t.subtypes).find(t => t.key === templateKey)?.label}

${Object.entries(form[templateKey] || {}).map(([k, v]) => `${k}: ${v}`).join("\n")}

[AI-generated contract content will appear here...]`
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    if (!selectedSubtype) return;
    setForm({
      ...form,
      [selectedSubtype]: {
        ...form[selectedSubtype],
        [field]: e.target.value,
      },
    })
  }

  function handleTypeSelect(typeKey: string) {
    setSelectedType(typeKey)
    setSelectedSubtype(null)
    setStep(1)
  }

  function handleSubtypeSelect(subKey: string) {
    setSelectedSubtype(subKey)
    setStep(2)
  }

  function handlePreview() {
    if (!selectedSubtype) return;
    setPreview(generatePreview(form, selectedSubtype))
    setStep(3)
  }

  function handleBack() {
    setStep(step - 1)
  }

  const selectedFields: string[] = selectedSubtype ? TEMPLATE_FIELDS[selectedSubtype] || [] : []
  const selectedSubtypeLabel = CONTRACT_TYPES.flatMap(t => t.subtypes).find(t => t.key === selectedSubtype)?.label || ""

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-32">
      {/* Hero Section */}
      <div className="relative w-full max-w-6xl mx-auto mt-12 mb-16 px-4 flex flex-col md:flex-row items-center md:items-stretch">
        {/* Decorative background blob behind image */}
        <div className="absolute right-0 md:right-8 top-1/2 md:top-1/3 -translate-y-1/2 md:-translate-y-1/3 w-96 h-96 bg-gradient-to-br from-blue-200 via-cyan-100 to-white rounded-full blur-3xl opacity-70 z-0 pointer-events-none"></div>
        {/* Text Section */}
        <div className="flex-1 z-10 flex flex-col justify-center md:pr-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent drop-shadow">AI-Powered</span>
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow">Contract Drafting</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-lg">
            Effortlessly create, customize, and preview legal contracts. Select a template, fill in the details, and let LegalWand’s AI do the rest.
          </p>
          <a href="#template-grid" className="inline-block px-7 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 transition text-lg mt-1">
            See Templates
          </a>
        </div>
        {/* Image Section - Overlapping and floating */}
        <div className="relative z-20 mt-10 md:mt-0 md:-ml-16 flex-shrink-0 flex items-center justify-center">
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white bg-white flex items-center justify-center relative">
            <img
              src="/images/legal-office-unsplash.jpg"
              alt="Legal illustration"
              className="object-cover w-full h-full"
            />
            {/* Subtle inner ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 opacity-30 pointer-events-none"></div>
          </div>
        </div>
      </div>
      {/* Step 1: Main contract type grid */}
      {step === 0 && (
        <div id="template-grid" className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">1. Choose a Contract Template</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {CONTRACT_TYPES.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.key}
                  onClick={() => handleTypeSelect(type.key)}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  style={{ minHeight: 220 }}
                >
                  <Icon className="w-14 h-14 text-blue-500 mb-4" />
                  <span className="text-lg font-bold mb-1 text-gray-900">{type.label}</span>
                  <span className="text-gray-500 text-base text-center mt-2">{type.description}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
      {/* Step 2: Subtype grid */}
      {step === 1 && selectedType && (
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">2. Choose a Subtype</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {CONTRACT_TYPES.find(t => t.key === selectedType)?.subtypes.map(sub => {
              const Icon = sub.icon;
              return (
                <button
                  key={sub.key}
                  onClick={() => handleSubtypeSelect(sub.key)}
                  className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  style={{ minHeight: 220 }}
                >
                  <Icon className="w-14 h-14 text-blue-500 mb-4" />
                  <span className="text-lg font-bold mb-1 text-gray-900">{sub.label}</span>
                  <span className="text-gray-500 text-base text-center mt-2">{sub.description}</span>
                </button>
              )
            })}
          </div>
          <div className="flex justify-center mt-8">
            <Button variant="ghost" className="text-gray-500 font-semibold" onClick={handleBack}>Back</Button>
          </div>
        </div>
      )}
      {/* Step 3: Dynamic form */}
      {step === 2 && selectedSubtype && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <Card className="w-full bg-white/90 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <FileText className="text-blue-600" /> {selectedSubtypeLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); handlePreview(); }}>
                {selectedFields.map(field => (
                  <Input
                    key={field}
                    name={field}
                    value={form[selectedSubtype][field] || ""}
                    onChange={e => handleInputChange(e, field)}
                    placeholder={field}
                    className="flex-1"
                    required
                  />
                ))}
                <div className="flex gap-3 mt-4 justify-end">
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md px-8 py-2 rounded-xl">
                    Next: Preview
                  </Button>
                  <Button type="button" variant="ghost" className="text-gray-500 font-semibold" onClick={handleBack}>
                    Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Step 4: Preview */}
      {step === 3 && selectedSubtype && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          <Card className="w-full bg-white/90 shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <FileText className="text-blue-600" /> {selectedSubtypeLabel} Preview
              </CardTitle>
              <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">AI Preview</Badge>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-gray-800 text-sm font-mono min-h-[300px]">
                {preview || "Fill in the form and click 'Next: Preview' to see your contract here."}
              </pre>
              <div className="flex gap-4 mt-6 justify-end">
                <Button variant="outline" className="border-green-600 text-green-700 font-semibold flex items-center gap-2 px-6 py-2 rounded-xl">
                  <Save className="w-4 h-4" /> Save as Draft
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-700 font-semibold flex items-center gap-2 px-6 py-2 rounded-xl">
                  <Download className="w-4 h-4" /> Export
                </Button>
                <Button type="button" variant="ghost" className="text-gray-500 font-semibold" onClick={handleBack}>
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
