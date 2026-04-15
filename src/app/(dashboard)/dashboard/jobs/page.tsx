"use client";
import { Search, Filter, ExternalLink, MoreVertical } from "lucide-react";
import WeeklyBarChart from "@/components/shared/WeeklyBarChart";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import C from "@/constants/colors";
import { applications } from "@/data/mockJobs";

export default function JobsPage() {
  return (
    <div>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Job Tracker</h1>
        <p style={{ color: C.muted, marginTop: 4 }}>Track your applications managed by Nexvelt.</p>
      </div>

      <div className="two-col" style={{ marginBottom: 20 }}>
        {/* Statistics Chart */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Weekly Activity</h3>
              <p style={{ color: C.muted, fontSize: 13 }}>Applications submitted per week</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>0</div>
              <div style={{ color: C.success, fontSize: 12, fontWeight: 600 }}>This Week</div>
            </div>
          </div>
          <WeeklyBarChart />
        </Card>

        {/* Filters and search box */}
        <Card style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Search & Filters</h3>
          <div
            style={{
              background: C.light,
              borderRadius: 10,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: `1px solid ${C.border}`,
            }}
          >
            <Search size={16} color={C.muted} />
            <input
              placeholder="Search companies or roles..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, display: "block" }}>STATUS</label>
              <select style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }}>
                <option>All Statuses</option>
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, display: "block" }}>TYPE</label>
              <select style={{ width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 13 }}>
                <option>All Types</option>
                <option>Automation</option>
                <option>Manual</option>
              </select>
            </div>
          </div>
          <button
            style={{
              marginTop: "auto",
              padding: "10px",
              borderRadius: 10,
              background: C.text,
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Apply Filters
          </button>
        </Card>
      </div>

      {/* Applications list */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: C.muted }}>COMPANY</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: C.muted }}>ROLE</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: C.muted }}>DATE</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: C.muted }}>STATUS</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: C.muted }}>SOURCE</th>
                <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: C.muted }}></th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px 20px", textAlign: "center", color: C.muted, fontSize: 14 }}>
                    No applications tracked yet. Start your career journey today!
                  </td>
                </tr>
              ) : (
                applications.map((app: any) => (
                  <tr
                    key={app.id}
                    style={{ borderBottom: `1px solid ${C.border}`, transition: "background 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = C.light)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "#F1F5F9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 12,
                            color: C.muted,
                          }}
                        >
                          {app.company.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{app.company}</span>
                      </div>
                    </td>
                    <td style={{ padding: "16px 20px", fontSize: 14, color: C.text }}>{app.role}</td>
                    <td style={{ padding: "16px 20px", fontSize: 13, color: C.muted }}>{app.date}</td>
                    <td style={{ padding: "16px 20px" }}>
                      <Badge variant={app.status === "Applied" ? "warning" : app.status === "Interview" ? "success" : "default"}>
                        {app.status}
                      </Badge>
                    </td>
                    <td style={{ padding: "16px 20px" }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: app.source === "Auto" ? C.teal : C.blue,
                          background: (app.source === "Auto" ? C.teal : C.blue) + "18",
                          padding: "2px 8px",
                          borderRadius: 6,
                        }}
                      >
                        {app.source}
                      </span>
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: C.light_text }}>
                          <ExternalLink size={15} />
                        </button>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: C.light_text }}>
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div style={{ padding: 16, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.muted }}>
            Showing {applications.length} of {applications.length} applications
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {[1, 2, 3, "...", 42].map((p, i) => (
              <button
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: `1px solid ${p === 1 ? C.teal : C.border}`,
                  background: p === 1 ? C.teal : "white",
                  color: p === 1 ? "white" : C.text,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
