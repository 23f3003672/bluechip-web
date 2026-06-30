"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CareersTable } from "./CareersTable";
import { CareerForm } from "./CareerForm";
import { AdminEmptyState, AdminPageHeading } from "@/components/admin/layout/AdminUx";
import { Mail, Phone, Calendar, FileText, Trash2, Eye, Search, Layers, UserCheck } from "lucide-react";
import type { ActionResult } from "@/types";

interface CareersAdminModuleProps {
  initialItems: any[];
  initialApplications: any[];
  createCareerAction: (payload: any) => Promise<any>;
  updateCareerAction: (id: string, payload: any) => Promise<any>;
  deleteCareerAction: (id: string) => Promise<any>;
  deleteJobApplicationAction: (id: string) => Promise<ActionResult>;
}

export function CareersAdminModule({
  initialItems,
  initialApplications,
  createCareerAction,
  updateCareerAction,
  deleteCareerAction,
  deleteJobApplicationAction,
}: CareersAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  
  // Jobs view states
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Applications view states
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);

  const handleCreate = async (payload: any) => {
    startTransition(async () => {
      const res = await createCareerAction(payload);
      if (!res.success) {
        toast.error(res.error ?? "Failed");
        return;
      }
      toast.success("Career created");
      setCreateOpen(false);
      router.refresh();
    });
  };

  const handleUpdate = async (payload: any) => {
    if (!editing) return;
    startTransition(async () => {
      const res = await updateCareerAction(editing.id, payload);
      if (!res.success) {
        toast.error(res.error ?? "Failed");
        return;
      }
      toast.success("Career updated");
      setEditing(null);
      router.refresh();
    });
  };

  const handleDeleteJob = (item: any) => {
    if (!confirm(`Delete job "${item.title}"?`)) return;
    startTransition(async () => {
      const res = await deleteCareerAction(item.id);
      if (!res.success) {
        toast.error(res.error ?? "Failed");
        return;
      }
      toast.success("Career deleted");
      router.refresh();
    });
  };

  const handleDeleteApplication = (id: string, name: string) => {
    if (!confirm(`Delete application from "${name}"?`)) return;
    startTransition(async () => {
      const res = await deleteJobApplicationAction(id);
      if (!res.success) {
        toast.error(res.error ?? "Failed to delete application.");
        return;
      }
      toast.success("Job application deleted");
      if (selectedApplication?.id === id) {
        setSelectedApplication(null);
      }
      router.refresh();
    });
  };

  // Filter applications based on search query
  const filteredApplications = initialApplications.filter((app) => {
    const term = appSearchQuery.toLowerCase();
    const jobTitle = app.careers?.title || "general application";
    return (
      app.name.toLowerCase().includes(term) ||
      app.email.toLowerCase().includes(term) ||
      app.phone.toLowerCase().includes(term) ||
      (app.cover_letter && app.cover_letter.toLowerCase().includes(term)) ||
      jobTitle.toLowerCase().includes(term)
    );
  });

  return (
    <section className="space-y-6">
      <AdminPageHeading
        title="Careers & Applications"
        description="Manage active job openings and review submitted job applications."
        pending={isPending}
        action={
          activeTab === "jobs" ? (
            <Button onClick={() => setCreateOpen(true)}>Create Job</Button>
          ) : undefined
        }
      />

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-tight border-b-2 transition-all cursor-pointer ${
            activeTab === "jobs"
              ? "border-[#1a56a8] text-[#1a56a8]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Job Openings ({initialItems.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-tight border-b-2 transition-all cursor-pointer ${
            activeTab === "applications"
              ? "border-[#1a56a8] text-[#1a56a8]"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>Applications ({initialApplications.length})</span>
        </button>
      </div>

      {/* JOBS TAB CONTENT */}
      {activeTab === "jobs" && (
        <div className="mt-4">
          <CareersTable rows={initialItems} onEdit={setEditing} onDelete={handleDeleteJob} isBusy={isPending} />
        </div>
      )}

      {/* APPLICATIONS TAB CONTENT */}
      {activeTab === "applications" && (
        <div className="space-y-4 mt-4">
          {/* Applications Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <div className="relative w-full sm:w-[280px]">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search applications..."
                value={appSearchQuery}
                onChange={(e) => setAppSearchQuery(e.target.value)}
                className="pl-9 h-9.5 text-xs w-full bg-slate-50/50 border-slate-200 focus-visible:bg-white"
              />
            </div>
            <div className="text-xs font-semibold text-slate-500 font-mono">
              Showing {filteredApplications.length} of {initialApplications.length} applications
            </div>
          </div>

          {/* Applications Table */}
          {filteredApplications.length === 0 ? (
            <AdminEmptyState
              title={initialApplications.length === 0 ? "No applications received yet" : "No matching applications found"}
              description={
                initialApplications.length === 0
                  ? "Submissions from the public careers page apply forms will appear here."
                  : "Try checking your search keyword spelling."
              }
            />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[180px] font-semibold text-slate-700">Applicant</TableHead>
                      <TableHead className="w-[200px] font-semibold text-slate-700">Contact</TableHead>
                      <TableHead className="w-[180px] font-semibold text-slate-700">Applied For</TableHead>
                      <TableHead className="font-semibold text-slate-700">Message / Cover Letter</TableHead>
                      <TableHead className="w-[100px] font-semibold text-slate-700">Resume</TableHead>
                      <TableHead className="w-[120px] font-semibold text-slate-700">Submitted</TableHead>
                      <TableHead className="w-[90px] text-right font-semibold text-slate-700">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((app) => (
                      <TableRow
                        key={app.id}
                        className="hover:bg-slate-50/50 cursor-pointer group"
                        onClick={() => setSelectedApplication(app)}
                      >
                        {/* Name */}
                        <TableCell className="align-top font-semibold text-slate-900 group-hover:text-[#1a56a8] transition-colors">
                          {app.name}
                        </TableCell>
                        
                        {/* Contact details */}
                        <TableCell className="align-top font-mono text-[11px] text-slate-500 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{app.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{app.phone}</span>
                          </div>
                        </TableCell>

                        {/* Applied Job */}
                        <TableCell className="align-top">
                          {app.careers?.title ? (
                            <span className="inline-block rounded-md bg-blue-50/80 px-2 py-0.75 text-[10px] font-semibold text-blue-700 font-mono border border-blue-100">
                              {app.careers.title}
                            </span>
                          ) : (
                            <span className="inline-block rounded-md bg-slate-100 px-2 py-0.75 text-[10px] font-semibold text-slate-500 font-mono border border-slate-200">
                              General Application
                            </span>
                          )}
                        </TableCell>

                        {/* Summary Cover Letter */}
                        <TableCell className="align-top text-xs text-slate-600 max-w-[300px]">
                          <p className="line-clamp-2 leading-relaxed">
                            {app.cover_letter || <span className="text-slate-400 italic">No notes provided</span>}
                          </p>
                        </TableCell>

                        {/* Resume link */}
                        <TableCell className="align-top" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={app.resume_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#1a56a8] hover:underline"
                          >
                            <FileText className="h-4 w-4 shrink-0" />
                            <span>Open CV</span>
                          </a>
                        </TableCell>

                        {/* Date submitted */}
                        <TableCell className="align-top font-mono text-[11px] text-slate-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
                            <span>{new Date(app.created_at).toLocaleDateString()}</span>
                          </div>
                        </TableCell>

                        {/* Action buttons */}
                        <TableCell className="align-top text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 text-slate-600 hover:text-[#1a56a8]"
                              onClick={() => setSelectedApplication(app)}
                              title="View Application Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteApplication(app.id, app.name)}
                              disabled={isPending}
                              title="Delete Submission"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE JOB DIALOG */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>Add a new job posting.</DialogDescription>
          </DialogHeader>
          <CareerForm submitLabel="Create Job" isSubmitting={isPending} onSubmit={handleCreate} />
        </DialogContent>
      </Dialog>

      {/* EDIT JOB DIALOG */}
      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>Update selected job posting.</DialogDescription>
          </DialogHeader>
          {editing && (
            <CareerForm
              submitLabel="Save Changes"
              isSubmitting={isPending}
              initialValues={{
                title: editing.title,
                slug: editing.slug,
                description: editing.description,
                location: editing.location,
                employment_type: editing.employment_type,
                department: editing.department,
                responsibilities: editing.responsibilities,
                qualifications: editing.qualifications,
                responsibilities_file_url: editing.responsibilities_file_url ?? "",
                qualifications_file_url: editing.qualifications_file_url ?? "",
                posted_at: editing.posted_at ? editing.posted_at.slice(0, 10) : undefined,
                closing_date: editing.closing_date ? editing.closing_date.slice(0, 10) : undefined,
              }}
              onSubmit={handleUpdate}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* APPLICATION DETAIL MODAL */}
      <Dialog open={Boolean(selectedApplication)} onOpenChange={(open) => !open && setSelectedApplication(null)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1a56a8]" />
              <DialogTitle className="text-lg font-bold text-slate-900">Job Application</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-400">
              Submitted on {selectedApplication && new Date(selectedApplication.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="py-4 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Applicant Name</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedApplication.name}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Applied Position</div>
                  <div>
                    {selectedApplication.careers?.title ? (
                      <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 font-mono border border-blue-100 mt-1">
                        {selectedApplication.careers.title}
                      </span>
                    ) : (
                      <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500 font-mono border border-slate-200 mt-1">
                        General Application
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Email Address</div>
                  <div className="text-sm font-mono text-slate-800">
                    <a href={`mailto:${selectedApplication.email}`} className="text-[#1a56a8] hover:underline">
                      {selectedApplication.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Phone Number</div>
                  <div className="text-sm font-mono text-slate-800">
                    <a href={`tel:${selectedApplication.phone.replace(/\s/g, "")}`} className="text-[#1a56a8] hover:underline">
                      {selectedApplication.phone}
                    </a>
                  </div>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Attached Resume (CV)</div>
                  <div className="mt-1">
                    <a
                      href={selectedApplication.resume_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 text-xs font-semibold text-[#1a56a8] transition-colors"
                    >
                      <FileText className="h-4.5 w-4.5 text-[#1a56a8]" />
                      <span>Open/Download Applicant CV</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Cover Letter Notes */}
              <div className="space-y-2 rounded-xl bg-slate-50 border border-slate-200/60 p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">Cover Letter / Notes</div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedApplication.cover_letter || <span className="text-slate-400 italic">No notes provided by the applicant.</span>}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteApplication(selectedApplication.id, selectedApplication.name)}
                  disabled={isPending}
                  className="gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Application</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedApplication(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
