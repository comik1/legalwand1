"use client"
import { useParams } from "next/navigation"
import { FileText, CheckCircle2, XCircle, UploadCloud, User, File, CreditCard, Folder } from "lucide-react"
import { useState } from "react"

const MOCK_CLIENT = {
  name: "Acme Corp",
  email: "contact@acme.com",
  phone: "+1 555-1234",
  company: "Acme Corp",
  added: "2024-06-01",
}
const MOCK_CONTRACTS = [
  { id: "c1", type: "NDA", status: "Signed", signed: "2024-06-10", value: 20000 },
  { id: "c2", type: "Service Agreement", status: "Active", signed: "2024-06-15", value: 100000 },
  { id: "c3", type: "Consulting", status: "Draft", signed: "-", value: 0 },
]
const MOCK_PAYMENTS = {
  total: 120000,
  invoiced: 90000,
  paid: 80000,
  outstanding: 10000,
  history: [
    { date: "2024-06-20", amount: 50000, method: "Bank Transfer", invoice: "INV-001" },
    { date: "2024-07-01", amount: 30000, method: "Credit Card", invoice: "INV-002" },
    { date: "2024-07-10", amount: 10000, method: "Bank Transfer", invoice: "INV-003" },
  ],
}
const MOCK_DOCS = [
  { name: "NDA.pdf", uploaded: "2024-06-10" },
  { name: "Service-Agreement.pdf", uploaded: "2024-06-15" },
  { name: "Company-Profile.docx", uploaded: "2024-06-01" },
]

const TABS = [
  { key: "info", label: "Info", icon: User },
  { key: "contracts", label: "Contracts", icon: File },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "documents", label: "Documents", icon: Folder },
]

export default function ClientProfilePage() {
  const params = useParams()
  const [tab, setTab] = useState("info")
  const client = MOCK_CLIENT
  const contracts = MOCK_CONTRACTS
  const payments = MOCK_PAYMENTS
  const docs = MOCK_DOCS

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl border border-blue-200 p-8 flex flex-col gap-8 mt-8 backdrop-blur-xl">
        {/* Tab Bar */}
        <div className="flex gap-2 border-b border-blue-100 mb-6 overflow-x-auto rounded-t-2xl bg-white/90 shadow-md p-2">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-6 py-2 font-semibold rounded-t-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300
                  ${tab === t.key ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500 shadow" : "text-gray-900 hover:bg-blue-50"}`}
                aria-selected={tab === t.key}
              >
                <Icon className="w-5 h-5" /> {t.label}
              </button>
            )
          })}
        </div>
        {/* Tab Content */}
        {tab === "info" && (
          <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Client Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><span className="font-semibold text-blue-700">Name:</span> {client.name}</div>
              <div><span className="font-semibold text-blue-700">Email:</span> {client.email}</div>
              <div><span className="font-semibold text-blue-700">Phone:</span> {client.phone}</div>
              <div><span className="font-semibold text-blue-700">Company:</span> {client.company}</div>
              <div><span className="font-semibold text-blue-700">Added:</span> {client.added}</div>
            </div>
          </section>
        )}
        {tab === "contracts" && (
          <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Contracts</h2>
            <table className="min-w-full text-left text-base">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="py-2 px-4 font-semibold">Type</th>
                  <th className="py-2 px-4 font-semibold">Status</th>
                  <th className="py-2 px-4 font-semibold">Signed Date</th>
                  <th className="py-2 px-4 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map(c => (
                  <tr key={c.id} className="hover:bg-blue-50/70 transition">
                    <td className="py-2 px-4">{c.type}</td>
                    <td className="py-2 px-4">
                      {c.status === "Signed" && <span className="inline-flex items-center gap-1 text-green-600"><CheckCircle2 className="w-4 h-4" /> Signed</span>}
                      {c.status === "Active" && <span className="inline-flex items-center gap-1 text-blue-600"><FileText className="w-4 h-4" /> Active</span>}
                      {c.status === "Draft" && <span className="inline-flex items-center gap-1 text-gray-400"><XCircle className="w-4 h-4" /> Draft</span>}
                    </td>
                    <td className="py-2 px-4">{c.signed}</td>
                    <td className="py-2 px-4">{c.value ? `$${c.value.toLocaleString()}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {tab === "payments" && (
          <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Payments</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
              <div><span className="font-semibold text-blue-700">Total Value:</span> ${payments.total.toLocaleString()}</div>
              <div><span className="font-semibold text-blue-700">Invoiced:</span> ${payments.invoiced.toLocaleString()}</div>
              <div><span className="font-semibold text-blue-700">Paid:</span> ${payments.paid.toLocaleString()}</div>
              <div><span className="font-semibold text-blue-700">Outstanding:</span> ${payments.outstanding.toLocaleString()}</div>
            </div>
            <table className="min-w-full text-left text-base">
              <thead>
                <tr className="bg-blue-50 text-blue-700">
                  <th className="py-2 px-4 font-semibold">Date</th>
                  <th className="py-2 px-4 font-semibold">Amount</th>
                  <th className="py-2 px-4 font-semibold">Method</th>
                  <th className="py-2 px-4 font-semibold">Invoice Ref</th>
                </tr>
              </thead>
              <tbody>
                {payments.history.map((p, i) => (
                  <tr key={i} className="hover:bg-blue-50/70 transition">
                    <td className="py-2 px-4">{p.date}</td>
                    <td className="py-2 px-4">${p.amount.toLocaleString()}</td>
                    <td className="py-2 px-4">{p.method}</td>
                    <td className="py-2 px-4">{p.invoice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        {tab === "documents" && (
          <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-8 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {docs.map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl shadow-sm">
                  <UploadCloud className="w-6 h-6 text-blue-400" />
                  <div className="flex-1">
                    <div className="font-semibold text-blue-800">{doc.name}</div>
                    <div className="text-xs text-blue-500">Uploaded: {doc.uploaded}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
} 