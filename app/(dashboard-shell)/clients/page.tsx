"use client"
import { useState } from "react"
import { Plus, Trash2, Search, X, User, File, CreditCard, Folder, FileText, CheckCircle2, XCircle, UploadCloud } from "lucide-react"
import Link from "next/link"

const MOCK_CLIENTS = [
  { id: "1", name: "Acme Corp", email: "contact@acme.com", phone: "+1 555-1234", contracts: 5, value: 120000 },
  { id: "2", name: "Beta LLC", email: "info@beta.com", phone: "+1 555-5678", contracts: 2, value: 34000 },
  { id: "3", name: "Gamma Inc", email: "hello@gamma.com", phone: "+1 555-8765", contracts: 8, value: 210000 },
]

// Add a type for client details
interface ClientDetails {
  name: string;
  email: string;
  phone: string;
  company: string;
  added: string;
  contracts: { id: string; type: string; status: string; signed: string; value: number }[];
  payments: {
    total: number;
    invoiced: number;
    paid: number;
    outstanding: number;
    history: { date: string; amount: number; method: string; invoice: string }[];
  };
  docs: { name: string; uploaded: string }[];
}

// Add index signature to MOCK_CLIENT_DETAILS
const MOCK_CLIENT_DETAILS: { [id: string]: ClientDetails } = {
  "1": {
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "+1 555-1234",
    company: "Acme Corp",
    added: "2024-06-01",
    contracts: [
      { id: "c1", type: "NDA", status: "Signed", signed: "2024-06-10", value: 20000 },
      { id: "c2", type: "Service Agreement", status: "Active", signed: "2024-06-15", value: 100000 },
      { id: "c3", type: "Consulting", status: "Draft", signed: "-", value: 0 },
    ],
    payments: {
      total: 120000,
      invoiced: 90000,
      paid: 80000,
      outstanding: 10000,
      history: [
        { date: "2024-06-20", amount: 50000, method: "Bank Transfer", invoice: "INV-001" },
        { date: "2024-07-01", amount: 30000, method: "Credit Card", invoice: "INV-002" },
        { date: "2024-07-10", amount: 10000, method: "Bank Transfer", invoice: "INV-003" },
      ],
    },
    docs: [
      { name: "NDA.pdf", uploaded: "2024-06-10" },
      { name: "Service-Agreement.pdf", uploaded: "2024-06-15" },
      { name: "Company-Profile.docx", uploaded: "2024-06-01" },
    ],
  },
  "2": {
    name: "Beta LLC",
    email: "info@beta.com",
    phone: "+1 555-5678",
    company: "Beta LLC",
    added: "2024-06-10",
    contracts: [
      { id: "c4", type: "NDA", status: "Signed", signed: "2024-06-12", value: 10000 },
    ],
    payments: {
      total: 34000,
      invoiced: 20000,
      paid: 15000,
      outstanding: 5000,
      history: [
        { date: "2024-06-15", amount: 10000, method: "Bank Transfer", invoice: "INV-004" },
        { date: "2024-06-20", amount: 5000, method: "Credit Card", invoice: "INV-005" },
      ],
    },
    docs: [
      { name: "NDA.pdf", uploaded: "2024-06-12" },
    ],
  },
  "3": {
    name: "Gamma Inc",
    email: "hello@gamma.com",
    phone: "+1 555-8765",
    company: "Gamma Inc",
    added: "2024-06-20",
    contracts: [],
    payments: {
      total: 210000,
      invoiced: 0,
      paid: 0,
      outstanding: 0,
      history: [],
    },
    docs: [],
  },
}

const TABS = [
  { key: "info", label: "Info", icon: User },
  { key: "contracts", label: "Contracts", icon: File },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "documents", label: "Documents", icon: Folder },
]

// Add new client type
interface NewClient {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  dob: string;
  gender: string;
  type: string;
  notes: string;
  profilePic?: string;
}

export default function ClientsListPage() {
  const [search, setSearch] = useState("")
  const [clients, setClients] = useState(MOCK_CLIENTS)
  const [showModal, setShowModal] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [tab, setTab] = useState("info")
  const [newClient, setNewClient] = useState<NewClient>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    dob: "",
    gender: "",
    type: "Individual",
    notes: "",
    profilePic: undefined,
  })

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  function handleDelete(id: string) {
    setClients(clients => clients.filter(c => c.id !== id))
  }

  function handleAddClient(e: React.FormEvent) {
    e.preventDefault()
    if (!newClient.name || !newClient.email || !newClient.phone) return
    setClients(clients => [
      ...clients,
      {
        id: (clients.length + 1).toString(),
        name: newClient.name,
        email: newClient.email,
        phone: newClient.phone,
        company: newClient.company,
        address: newClient.address,
        city: newClient.city,
        state: newClient.state,
        zip: newClient.zip,
        country: newClient.country,
        dob: newClient.dob,
        gender: newClient.gender,
        type: newClient.type,
        notes: newClient.notes,
        profilePic: newClient.profilePic,
        contracts: 0,
        value: 0,
      },
    ])
    setNewClient({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      dob: "",
      gender: "",
      type: "Individual",
      notes: "",
      profilePic: undefined,
    })
    setShowModal(false)
  }

  function openClientModal(id: string) {
    setSelectedClientId(id)
    setTab("info")
  }

  function closeClientModal() {
    setSelectedClientId(null)
  }

  const selectedClient = selectedClientId ? MOCK_CLIENT_DETAILS[selectedClientId] : null

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-0 md:p-8">
      {/* Sticky header */}
      <div className="w-full sticky top-0 z-20 bg-white rounded-b-3xl px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-blue-100">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">Client Management</h1>
        <div className="flex gap-2 items-center w-full md:w-auto">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 pr-10 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition text-base shadow-sm"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-blue-400" />
          </div>
          <button
            className="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg hover:from-blue-600 hover:to-indigo-600 flex items-center gap-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-5 h-5" /> Add New Client
          </button>
        </div>
      </div>
      {/* Table Card */}
      <div className="w-full max-w-6xl bg-white/95 rounded-3xl shadow-2xl border border-blue-200 p-8 flex flex-col gap-8 mt-8 backdrop-blur-xl">
        <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/90">
          <table className="min-w-full text-left text-base">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="py-4 px-4 font-semibold">Client Name</th>
                <th className="py-4 px-4 font-semibold">Email</th>
                <th className="py-4 px-4 font-semibold">Phone</th>
                <th className="py-4 px-4 font-semibold">Total Contracts</th>
                <th className="py-4 px-4 font-semibold">Total Contract Value</th>
                <th className="py-4 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-blue-400 py-12">No clients found.</td>
                </tr>
              )}
              {filtered.map(client => (
                <tr
                  key={client.id}
                  className="hover:bg-blue-50/70 transition cursor-pointer group rounded-xl"
                  onClick={() => openClientModal(client.id)}
                >
                  <td className="py-4 px-4 font-bold text-blue-700 underline group-hover:text-indigo-700">
                    <span>{client.name}</span>
                  </td>
                  <td className="py-4 px-4">{client.email}</td>
                  <td className="py-4 px-4">{client.phone}</td>
                  <td className="py-4 px-4">{client.contracts}</td>
                  <td className="py-4 px-4">${client.value.toLocaleString()}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-all duration-150"
                      onClick={e => { e.stopPropagation(); handleDelete(client.id) }}
                      title="Delete/Archive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative flex flex-col gap-6 border border-blue-200 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 p-2 rounded-full focus:outline-none"
              onClick={() => setShowModal(false)}
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Add New Client</h2>
            <form className="flex flex-col gap-4" onSubmit={handleAddClient}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Full Name</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Email</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} type="email" required />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Phone</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Company Name</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.company} onChange={e => setNewClient({ ...newClient, company: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Address</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })} />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">City</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.city} onChange={e => setNewClient({ ...newClient, city: e.target.value })} />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">State</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.state} onChange={e => setNewClient({ ...newClient, state: e.target.value })} />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Zip</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.zip} onChange={e => setNewClient({ ...newClient, zip: e.target.value })} />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Country</label>
                  <input className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.country} onChange={e => setNewClient({ ...newClient, country: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Date of Birth</label>
                  <input type="date" className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.dob} onChange={e => setNewClient({ ...newClient, dob: e.target.value })} />
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Gender</label>
                  <select className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.gender} onChange={e => setNewClient({ ...newClient, gender: e.target.value })}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Client Type</label>
                  <select className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" value={newClient.type} onChange={e => setNewClient({ ...newClient, type: e.target.value })}>
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                  </select>
                </div>
                <div>
                  <label className="block text-blue-700 font-semibold mb-1">Profile Picture (optional)</label>
                  <input type="file" accept="image/*" className="w-full rounded-lg border border-blue-200 px-4 py-2 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm" onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = ev => setNewClient({ ...newClient, profilePic: ev.target?.result as string })
                      reader.readAsDataURL(file)
                    }
                  }} />
                </div>
              </div>
              <div>
                <label className="block text-blue-700 font-semibold mb-1">Notes / Description</label>
                <textarea className="w-full rounded-lg border border-blue-200 px-4 py-3 text-blue-900 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 shadow-sm min-h-[60px]" value={newClient.notes} onChange={e => setNewClient({ ...newClient, notes: e.target.value })} />
              </div>
              <button type="submit" className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-600 transition-all duration-150">Add Client</button>
            </form>
          </div>
        </div>
      )}
      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-4xl relative flex flex-col gap-10 border border-blue-200">
            <button
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-700 p-2 rounded-full focus:outline-none"
              onClick={closeClientModal}
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
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
              <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Client Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><span className="font-semibold text-blue-700">Name:</span> {selectedClient.name}</div>
                  <div><span className="font-semibold text-blue-700">Email:</span> {selectedClient.email}</div>
                  <div><span className="font-semibold text-blue-700">Phone:</span> {selectedClient.phone}</div>
                  <div><span className="font-semibold text-blue-700">Company:</span> {selectedClient.company}</div>
                  <div><span className="font-semibold text-blue-700">Added:</span> {selectedClient.added}</div>
                </div>
              </section>
            )}
            {tab === "contracts" && (
              <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
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
                    {selectedClient.contracts.length === 0 && (
                      <tr><td colSpan={4} className="text-center text-blue-400 py-6">No contracts found.</td></tr>
                    )}
                    {selectedClient.contracts.map((c: any) => (
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
              <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Payments</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                  <div><span className="font-semibold text-blue-700">Total Value:</span> ${selectedClient.payments.total.toLocaleString()}</div>
                  <div><span className="font-semibold text-blue-700">Invoiced:</span> ${selectedClient.payments.invoiced.toLocaleString()}</div>
                  <div><span className="font-semibold text-blue-700">Paid:</span> ${selectedClient.payments.paid.toLocaleString()}</div>
                  <div><span className="font-semibold text-blue-700">Outstanding:</span> ${selectedClient.payments.outstanding.toLocaleString()}</div>
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
                    {selectedClient.payments.history.length === 0 && (
                      <tr><td colSpan={4} className="text-center text-blue-400 py-6">No payment history found.</td></tr>
                    )}
                    {selectedClient.payments.history.map((p: any, i: number) => (
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
              <section className="bg-white/90 border border-blue-100 rounded-2xl shadow-xl p-6 flex flex-col gap-4">
                <h2 className="text-xl font-bold text-blue-900 mb-2">Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedClient.docs.length === 0 && (
                    <div className="text-blue-400">No documents found.</div>
                  )}
                  {selectedClient.docs.map((doc: any, i: number) => (
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
      )}
    </div>
  )
} 