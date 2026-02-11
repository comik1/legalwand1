"use client"
import { useState } from "react"
import { User, Mail, Bell, CreditCard, Users, Link2, Copy, RefreshCw, CheckCircle, Eye, EyeOff, Trash2, Plus, Zap, Cloud, Slack, Database } from "lucide-react"

const MOCK_USER = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  avatar: "/public/placeholder-user.jpg",
}
const MOCK_ORG = {
  name: "Acme Legal Inc.",
  team: [
    { name: "Jane Doe", email: "jane.doe@email.com", role: "Owner" },
    { name: "John Smith", email: "john.smith@email.com", role: "Member" },
  ],
}
const MOCK_PLAN = {
  name: "Pro",
  price: "$49/mo",
  nextBilling: "2024-08-01",
  usage: { contracts: 42, limit: 100 },
  invoices: [
    { id: "INV-001", date: "2024-06-01", amount: "$49", status: "Paid" },
    { id: "INV-002", date: "2024-05-01", amount: "$49", status: "Paid" },
  ],
}
const MOCK_INTEGRATIONS = [
  { key: "drive", name: "Google Drive", icon: Cloud, connected: true },
  { key: "dropbox", name: "Dropbox", icon: Database, connected: false },

]

export default function SettingsPage() {
  const [user, setUser] = useState(MOCK_USER)
  const [org, setOrg] = useState(MOCK_ORG)
  const [plan, setPlan] = useState(MOCK_PLAN)
  const [notifications, setNotifications] = useState({ email: true, slack: false, sms: false, frequency: "immediate" })
  const [connected, setConnected] = useState({ drive: true, dropbox: false, salesforce: false, slack: true, zapier: false })
  const [tab, setTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")

  function handleInvite() {
    if (inviteEmail) {
      setOrg(o => ({ ...o, team: [...o.team, { name: inviteEmail.split("@")[0], email: inviteEmail, role: "Invited" }] }))
      setInviteEmail("")
    }
  }
  function handleRemoveMember(idx: number) {
    setOrg(o => ({ ...o, team: o.team.filter((_, i) => i !== idx) }))
  }
  function handleConnect(key: string) {
    setConnected(c => ({ ...c, [key]: !c[key as keyof typeof c] }))
  }

  const TABS = [
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "organization", label: "Organization", icon: Users },
    { key: "plan", label: "Plan & Billing", icon: CreditCard },
    { key: "apps", label: "Connected Apps", icon: Link2 },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex-1 flex flex-col justify-center items-center min-h-screen w-full">
        <div className="w-full h-full bg-white/90 rounded-3xl shadow-2xl border border-blue-200 flex flex-col gap-10 p-6 md:p-12 xl:p-16 max-w-7xl mx-auto min-h-[80vh]">
          <div className="text-center mb-2 pt-6 pb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-500 bg-clip-text text-transparent mb-1">Settings</h1>
            <p className="text-base text-blue-700">Manage your profile, organization, plan, and integrations.</p>
          </div>
          {/* Tabs */}
          <div className="flex gap-2 border-b border-blue-100 mb-6 overflow-x-auto">
            {TABS.map(t => {
              const Icon = t.icon
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-5 py-2 font-semibold rounded-t-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300
                    ${tab === t.key ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500" : "text-gray-900 hover:bg-blue-50"}`}
                  aria-selected={tab === t.key}
                >
                  <Icon className="w-5 h-5" /> {t.label}
                </button>
              )
            })}
          </div>
          {/* Tab Content */}
          <div>
            {tab === "profile" && (
              <section className="bg-white-50 border border-blue-200 rounded-xl p-8 mb-8 flex flex-col gap-6 -mt-7">
                <div className="flex items-center gap-6 mb-4">
                  <div className="relative">
                    <img
                      src={user.avatar || "/placeholder-user.jpg"}
                      alt="avatar"
                      className="w-20 h-20 rounded-full border-2 border-blue-200 object-cover shadow-lg"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute bottom-0 right-0 w-8 h-8 opacity-0 cursor-pointer"
                      title="Upload profile photo"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = ev => setUser(u => ({ ...u, avatar: ev.target?.result as string }))
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center text-xs font-bold shadow cursor-pointer pointer-events-none">
                      Edit
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-blue-900 text-xl flex items-center gap-2"><User className="w-5 h-5" /> Profile</div>
                    <div className="text-blue-700 text-sm">Update your personal info</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-blue-700 font-semibold mb-1">Name</label>
                    <input className="w-full rounded-lg border border-blue-200 px-3 py-2 text-blue-900 bg-white" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-blue-700 font-semibold mb-1">Email</label>
                    <input className="w-full rounded-lg border border-blue-200 px-3 py-2 text-blue-900 bg-white" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-blue-700 font-semibold mb-1">Change Password</label>
                    <div className="flex items-center gap-2">
                      <input type={showPassword ? "text" : "password"} className="w-full rounded-lg border border-blue-200 px-3 py-2 text-blue-900 bg-white" value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" />
                      <button type="button" onClick={() => setShowPassword(v => !v)} className="text-blue-500 hover:text-blue-700">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-500 text-white font-bold shadow hover:from-blue-800 hover:to-indigo-600">Save Profile</button>
                </div>
              </section>
            )}
            {tab === "notifications" && (
              <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 mb-8 flex flex-col gap-6">
                <div className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Bell className="w-5 h-5" /> Notification Preferences</div>
                <div className="flex gap-8 flex-wrap">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={notifications.email} onChange={e => setNotifications(n => ({ ...n, email: e.target.checked }))} className="accent-blue-600 w-5 h-5" />
                    <span className="text-blue-900">Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={notifications.slack} onChange={e => setNotifications(n => ({ ...n, slack: e.target.checked }))} className="accent-indigo-600 w-5 h-5" />
                    <span className="text-indigo-900">Slack</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={notifications.sms} onChange={e => setNotifications(n => ({ ...n, sms: e.target.checked }))} className="accent-blue-400 w-5 h-5" />
                    <span className="text-blue-700">SMS</span>
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-indigo-900 font-semibold mb-1">Notification Frequency</label>
                  <select className="w-full rounded-lg border border-indigo-200 px-3 py-2 text-indigo-900 bg-white" value={notifications.frequency} onChange={e => setNotifications(n => ({ ...n, frequency: e.target.value }))}>
                    <option value="immediate">Immediate</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600">Save Preferences</button>
                </div>
              </section>
            )}
            {tab === "organization" && (
              <section className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8 flex flex-col gap-6">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2"><Users className="w-5 h-5" /> Organization</div>
                <div className="mb-2">
                  <label className="block text-blue-700 font-semibold mb-1">Organization Name</label>
                  <input className="w-full rounded-lg border border-blue-200 px-3 py-2 text-blue-900 bg-white" value={org.name} onChange={e => setOrg({ ...org, name: e.target.value })} />
                </div>
                <div className="mt-2">
                  <div className="text-blue-700 font-semibold mb-1">Team Members</div>
                  <ul className="pl-4 list-disc text-blue-900 mb-2">
                    {org.team.map((member, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span>{member.name} <span className="text-xs text-gray-500">({member.email})</span> <span className="ml-2 text-xs text-indigo-700 font-semibold">{member.role}</span></span>
                        <button onClick={() => handleRemoveMember(idx)} className="ml-2 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 mt-2">
                    <input className="flex-1 rounded-lg border border-blue-200 px-3 py-2 text-blue-900 bg-white" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="Invite by email..." />
                    <button onClick={handleInvite} className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600 flex items-center gap-1"><Plus className="w-4 h-4" /> Invite</button>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600">Save Organization</button>
                </div>
              </section>
            )}
            {tab === "plan" && (
              <section className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8 flex flex-col gap-6">
                <div className="font-bold text-blue-900 mb-2 flex items-center gap-2"><CreditCard className="w-5 h-5" /> Plan & Billing</div>
                <div className="flex flex-col md:flex-row gap-8 md:items-center">
                  <div>
                    <div className="text-blue-900 font-semibold">{plan.name} Plan</div>
                    <div className="text-blue-700">{plan.price}</div>
                    <div className="text-xs text-gray-500">Next billing: {plan.nextBilling}</div>
                  </div>
                  <div className="flex flex-col gap-2 md:ml-auto">
                    <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600">Upgrade</button>
                    <button className="px-5 py-2 rounded-lg bg-gray-100 text-blue-700 font-bold shadow hover:bg-gray-200">Downgrade</button>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-blue-700 font-semibold mb-1">Usage</div>
                  <div className="flex items-center gap-4">
                    <div className="w-full bg-blue-100 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-3 rounded-full" style={{ width: `${(plan.usage.contracts / plan.usage.limit) * 100}%` }}></div>
                    </div>
                    <span className="text-blue-900 text-sm font-semibold">{plan.usage.contracts} / {plan.usage.limit} contracts</span>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-blue-700 font-semibold mb-1">Payment Method</label>
                  <input className="w-full rounded-lg border border-blue-200 px-3 py-2 text-blue-900 bg-white" value="Visa •••• 4242" readOnly />
                </div>
                <div className="mt-4">
                  <div className="text-blue-700 font-semibold mb-1">Invoices</div>
                  <table className="w-full text-left text-blue-900 bg-white rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="py-2 px-3 font-semibold">Invoice #</th>
                        <th className="py-2 px-3 font-semibold">Date</th>
                        <th className="py-2 px-3 font-semibold">Amount</th>
                        <th className="py-2 px-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan.invoices.map(inv => (
                        <tr key={inv.id} className="border-b last:border-b-0">
                          <td className="py-2 px-3">{inv.id}</td>
                          <td className="py-2 px-3">{inv.date}</td>
                          <td className="py-2 px-3">{inv.amount}</td>
                          <td className="py-2 px-3"><span className={`px-2 py-1 rounded text-xs font-bold ${inv.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{inv.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600">Save Billing</button>
                </div>
              </section>
            )}
            {tab === "apps" && (
              <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-8 mb-8 flex flex-col gap-6">
                <div className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Link2 className="w-5 h-5" /> Connected Apps</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_INTEGRATIONS.map((app: any) => {
                    const Icon = app.icon
                    return (
                      <div key={app.key} className="flex items-center gap-4 bg-white border border-indigo-100 rounded-lg p-4">
                        <Icon className="w-7 h-7 text-indigo-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-indigo-900">{app.name}</div>
                          <div className="text-xs text-gray-500">{app.connected ? "Connected" : "Not connected"}</div>
                        </div>
                        <button
                          onClick={() => handleConnect(app.key)}
                          className={`px-4 py-2 rounded-lg font-bold shadow transition flex items-center gap-1
                            ${app.connected ? "bg-gray-100 text-indigo-700 hover:bg-gray-200" : "bg-gradient-to-r from-blue-600 to-indigo-500 text-white hover:from-blue-700 hover:to-indigo-600"}`}
                        >
                          {app.connected ? "Disconnect" : "Connect"}
                        </button>
                        {app.connected && <span className="ml-2 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold">Connected</span>}
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-end mt-4">
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-600">Save Integrations</button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
