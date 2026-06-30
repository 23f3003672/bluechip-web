"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminEmptyState, AdminPageHeading } from "@/components/admin/layout/AdminUx";
import { Search, Trash2, Eye, Calendar, Mail, Phone, Building2, MapPin, Filter } from "lucide-react";
import type { ActionResult } from "@/types";

interface Inquiry {
  id: string;
  name: string;
  company_name: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  location: string | null;
  message: string;
  created_at: string;
}

interface InquiriesAdminModuleProps {
  initialInquiries: Inquiry[];
  deleteInquiryAction: (id: string) => Promise<ActionResult>;
}

export function InquiriesAdminModule({
  initialInquiries,
  deleteInquiryAction,
}: InquiriesAdminModuleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  const handleClearFilters = () => {
    setSearchQuery("");
    setServiceFilter("all");
  };

  // Filtered inquiries
  const filteredInquiries = initialInquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inquiry.company_name &&
        inquiry.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesService =
      serviceFilter === "all" ||
      (inquiry.service && inquiry.service.toLowerCase() === serviceFilter.toLowerCase());

    return matchesSearch && matchesService;
  });

  // Extract unique services for dropdown
  const uniqueServices = Array.from(
    new Set(
      initialInquiries
        .map((i) => i.service)
        .filter((s): s is string => typeof s === "string" && s !== "")
    )
  );

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the inquiry from ${name}?`)) {
      return;
    }

    startTransition(async () => {
      const result = await deleteInquiryAction(id);
      if (!result.success) {
        toast.error(result.error || "Failed to delete inquiry.");
        return;
      }
      toast.success("Inquiry deleted successfully!");
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      router.refresh();
    });
  };

  return (
    <section className="space-y-6">
      <AdminPageHeading
        title="Client Inquiries"
        description="View and manage messages submitted by clients through the Contact Us form."
        pending={isPending}
      />

      {/* Search and Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4.5 shadow-2xs">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-[280px]">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9.5 text-xs w-full bg-slate-50/50 border-slate-200 focus-visible:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="h-9.5 rounded-lg border border-slate-200 bg-slate-50/50 px-3 text-xs text-slate-600 outline-none transition focus:border-slate-300 focus:bg-white cursor-pointer"
            >
              <option value="all">All Services</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service.toLowerCase()}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || serviceFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-xs text-[#1a56a8] hover:text-[#1a56a8]/80 hover:bg-[#1a56a8]/5"
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-500 font-mono">
          Showing {filteredInquiries.length} of {initialInquiries.length} inquiries
        </div>
      </div>

      {/* Main Table Content */}
      {filteredInquiries.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            title={initialInquiries.length === 0 ? "No inquiries received yet" : "No matching inquiries found"}
            description={
              initialInquiries.length === 0
                ? "Submissions from the frontend contact us form will appear here."
                : "Try adjusting your search terms or filter selection."
            }
          />
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[180px] font-semibold text-slate-700">Client</TableHead>
                  <TableHead className="w-[200px] font-semibold text-slate-700">Contact</TableHead>
                  <TableHead className="w-[150px] font-semibold text-slate-700">Service</TableHead>
                  <TableHead className="font-semibold text-slate-700">Message</TableHead>
                  <TableHead className="w-[120px] font-semibold text-slate-700">Submitted</TableHead>
                  <TableHead className="w-[90px] text-right font-semibold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInquiries.map((inquiry) => (
                  <TableRow
                    key={inquiry.id}
                    className="hover:bg-slate-50/50 cursor-pointer group"
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <TableCell className="align-top">
                      <div className="font-semibold text-slate-900 group-hover:text-[#1a56a8] transition-colors">
                        {inquiry.name}
                      </div>
                      {inquiry.company_name && (
                        <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                          <Building2 className="h-3 w-3 shrink-0" />
                          <span>{inquiry.company_name}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="align-top font-mono text-[11px] text-slate-500 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[170px]">{inquiry.email}</span>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>{inquiry.phone}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      {inquiry.service ? (
                        <span className="inline-block rounded-md bg-blue-50/80 px-2 py-0.75 text-[10px] font-semibold text-blue-700 font-mono border border-blue-100">
                          {inquiry.service}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-mono">-</span>
                      )}
                    </TableCell>
                    <TableCell className="align-top">
                      <p className="text-xs text-slate-600 line-clamp-2 max-w-[420px] leading-relaxed">
                        {inquiry.message}
                      </p>
                      {inquiry.location && (
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-1">
                          <MapPin className="h-2.5 w-2.5 shrink-0 text-slate-400" />
                          <span>{inquiry.location}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="align-top font-mono text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
                        <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      className="align-top text-right"
                      onClick={(e) => e.stopPropagation()} // Prevent row click trigger
                    >
                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-slate-600 hover:text-[#1a56a8] hover:border-[#1a56a8]"
                          onClick={() => setSelectedInquiry(inquiry)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDelete(inquiry.id, inquiry.name)}
                          disabled={isPending}
                          title="Delete Inquiry"
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

      {/* Inquiry Detail View Modal */}
      <Dialog
        open={Boolean(selectedInquiry)}
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#1a56a8]" />
              <DialogTitle className="text-lg font-bold text-slate-900">Inquiry Details</DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-400">
              Submitted on {selectedInquiry && new Date(selectedInquiry.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="py-4 space-y-6">
              {/* Header Info */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Client Name</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedInquiry.name}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Company Name</div>
                  <div className="text-sm font-semibold text-slate-900">
                    {selectedInquiry.company_name || <span className="text-slate-400 italic">Not Provided</span>}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Email Address</div>
                  <div className="text-sm font-mono text-slate-800">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-[#1a56a8] hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Phone Number</div>
                  <div className="text-sm font-mono text-slate-800">
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone.replace(/\s/g, "")}`} className="text-[#1a56a8] hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Not Provided</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Service Interested In</div>
                  <div>
                    {selectedInquiry.service ? (
                      <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 font-mono border border-blue-100 mt-1">
                        {selectedInquiry.service}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-sm">Not Provided</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Project Location</div>
                  <div className="text-sm text-slate-800 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{selectedInquiry.location || <span className="text-slate-400 italic">Not Provided</span>}</span>
                  </div>
                </div>
              </div>

              {/* Message Block */}
              <div className="space-y-2 rounded-xl bg-slate-50 border border-slate-200/60 p-4">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Client Message</div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.name)}
                  disabled={isPending}
                  className="gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete Inquiry</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInquiry(null)}
                >
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
