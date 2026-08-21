import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm, usePage, Head, Link, router } from "@inertiajs/react";
import { A as AdminLayout, c as confirmAction } from "./AdminLayout-3Zrdf8uE.js";
import { Folder, Trash2, FolderPlus, Edit2, ChevronLeft, Search, SquarePen, Type, ListTodo, Table, Paperclip, Minimize2, Maximize2, FileText } from "lucide-react";
import "react-dom";
import "react-hot-toast";
function debounce(func, waitFor) {
  let timeout = null;
  return (...args) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };
}
function NotesIndex({ folders, notes, currentFolderId, isBin }) {
  var _a;
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mobileActivePane, setMobileActivePane] = useState("folders");
  const folderForm = useForm({ name: "" });
  const noteForm = useForm({ title: "", content: "", note_folder_id: currentFolderId || "" });
  const { url } = usePage();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get("note_id");
    if (noteId && notes.length > 0) {
      const note = notes.find((n) => n.id === parseInt(noteId));
      if (note) setSelectedNote(note);
      window.history.replaceState({}, "", url.split("&note_id")[0]);
    }
  }, [notes, url]);
  useEffect(() => {
    if (selectedNote) {
      noteForm.setData({
        title: selectedNote.title || "",
        content: selectedNote.content || "",
        note_folder_id: selectedNote.note_folder_id || ""
      });
      setMobileActivePane("editor");
    } else if (mobileActivePane === "editor") {
      setMobileActivePane("list");
    }
  }, [selectedNote]);
  const saveNote = debounce((data) => {
    if (!selectedNote) return;
    router.put(`/admin/notes/${selectedNote.id}`, data, { preserveScroll: true, preserveState: true });
  }, 1e3);
  const handleNoteChange = (field, value) => {
    noteForm.setData(field, value);
    const updatedData = { ...noteForm.data, [field]: value };
    saveNote(updatedData);
    setSelectedNote({ ...selectedNote, [field]: value });
  };
  const createNote = () => {
    router.post("/admin/notes", { title: "Untitled Note", content: "", note_folder_id: currentFolderId }, { preserveScroll: true });
  };
  const handleFolderSubmit = (e) => {
    e.preventDefault();
    if (editingFolderId) {
      folderForm.put(`/admin/note-folders/${editingFolderId}`, {
        preserveScroll: true,
        onSuccess: () => {
          setEditingFolderId(null);
          folderForm.reset();
        }
      });
    } else {
      folderForm.post("/admin/note-folders", {
        preserveScroll: true,
        onSuccess: () => {
          setIsCreatingFolder(false);
          folderForm.reset();
        }
      });
    }
  };
  const deleteFolder = async (id) => {
    if (await confirmAction("Are you sure you want to delete this folder?")) {
      router.delete(`/admin/note-folders/${id}`, { preserveScroll: true });
    }
  };
  const trashNote = (id) => {
    router.post(`/admin/notes/trash/${id}`, {}, { preserveScroll: true });
    if ((selectedNote == null ? void 0 : selectedNote.id) === id) setSelectedNote(null);
  };
  const restoreNote = (id) => {
    router.post(`/admin/notes/restore/${id}`, {}, { preserveScroll: true });
    if ((selectedNote == null ? void 0 : selectedNote.id) === id) setSelectedNote(null);
  };
  const deleteNote = async (id) => {
    if (await confirmAction("Delete permanently?")) {
      router.delete(`/admin/notes/${id}`, { preserveScroll: true });
      if ((selectedNote == null ? void 0 : selectedNote.id) === id) setSelectedNote(null);
    }
  };
  const filteredNotes = notes.filter(
    (n) => {
      var _a2, _b;
      return ((_a2 = n.title) == null ? void 0 : _a2.toLowerCase().includes(searchQuery.toLowerCase())) || ((_b = n.content) == null ? void 0 : _b.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  );
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: d.getFullYear() !== (/* @__PURE__ */ new Date()).getFullYear() ? "numeric" : void 0 });
  };
  return /* @__PURE__ */ jsxs(AdminLayout, { title: "Team Notes", children: [
    /* @__PURE__ */ jsx(Head, { title: "Team Notes" }),
    /* @__PURE__ */ jsxs("div", { className: `flex flex-col md:flex-row bg-white dark:bg-admin-bg shadow border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-300 ${isFullscreen ? "fixed inset-4 z-50 shadow-2xl" : "h-[calc(100vh-8rem)]"}`, children: [
      !isFullscreen && /* @__PURE__ */ jsxs("div", { className: `${mobileActivePane === "folders" ? "flex" : "hidden md:flex"} w-full md:w-[260px] max-h-full flex-shrink-0 border-r border-gray-200/60 dark:border-gray-800 bg-[#f6f6f6] dark:bg-[#1e1e1e] flex-col`, children: [
        /* @__PURE__ */ jsxs("div", { className: "px-4 py-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2", children: "Cloud Note" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxs(
              Link,
              {
                href: "/admin/notes",
                preserveState: true,
                onClick: () => setMobileActivePane("list"),
                className: `flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${!currentFolderId && !isBin ? "bg-[#e5e5e5] dark:bg-[#333333] text-[#c9952a] dark:text-[#ffca28]" : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx(Folder, { className: `w-4 h-4 ${!currentFolderId && !isBin ? "text-[#c9952a] dark:text-[#ffca28] fill-[#c9952a]/20" : "text-gray-500 fill-gray-400/20"}` }),
                    "All Cloud Notes"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[12px] opacity-60 font-normal", children: notes.length })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/admin/notes?bin=1",
                preserveState: true,
                onClick: () => setMobileActivePane("list"),
                className: `flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${isBin ? "bg-[#e5e5e5] dark:bg-[#333333] text-[#c9952a] dark:text-[#ffca28]" : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800"}`,
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 opacity-70" }),
                  "Recently Deleted"
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "px-4 flex-1 overflow-y-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2 px-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-widest", children: "Folders" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  setIsCreatingFolder(true);
                  folderForm.reset();
                  setEditingFolderId(null);
                },
                className: "p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors",
                children: /* @__PURE__ */ jsx(FolderPlus, { className: "w-3.5 h-3.5" })
              }
            )
          ] }),
          isCreatingFolder && /* @__PURE__ */ jsx("form", { onSubmit: handleFolderSubmit, className: "mb-2 px-2", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              autoFocus: true,
              placeholder: "Folder name",
              className: "w-full bg-white border border-gray-300 rounded text-sm px-2 py-1 focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107]",
              value: folderForm.data.name,
              onChange: (e) => folderForm.setData("name", e.target.value),
              onBlur: () => {
                if (!folderForm.data.name) setIsCreatingFolder(false);
              }
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "space-y-0.5", children: folders.map((folder) => /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
            editingFolderId === folder.id ? /* @__PURE__ */ jsx("form", { onSubmit: handleFolderSubmit, className: "px-2", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                autoFocus: true,
                className: "w-full bg-white border border-gray-300 rounded text-sm px-2 py-1 focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107]",
                value: folderForm.data.name,
                onChange: (e) => folderForm.setData("name", e.target.value),
                onBlur: () => setEditingFolderId(null)
              }
            ) }) : /* @__PURE__ */ jsxs(
              Link,
              {
                href: `/admin/notes?folder_id=${folder.id}`,
                preserveState: true,
                onClick: () => setMobileActivePane("list"),
                className: `flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${currentFolderId == folder.id ? "bg-[#e5e5e5] dark:bg-[#333333] text-[#c9952a] dark:text-[#ffca28]" : "text-gray-800 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 truncate", children: [
                    /* @__PURE__ */ jsx(Folder, { className: `w-4 h-4 shrink-0 ${currentFolderId == folder.id ? "text-[#c9952a] dark:text-[#ffca28] fill-[#c9952a]/20" : "text-gray-500 fill-gray-400/20"}` }),
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: folder.name })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-[12px] opacity-60 font-normal shrink-0", children: notes.filter((n) => n.folder_id === folder.id).length || 0 })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: `absolute right-1 top-1/2 -translate-y-1/2 items-center gap-0.5 ${currentFolderId == folder.id ? "flex text-white" : "hidden group-hover:flex text-gray-500"}`, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.preventDefault();
                    setEditingFolderId(folder.id);
                    folderForm.setData("name", folder.name);
                  },
                  className: "p-1 hover:opacity-70 transition-opacity",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: (e) => {
                    e.preventDefault();
                    deleteFolder(folder.id);
                  },
                  className: "p-1 hover:opacity-70 transition-opacity",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" })
                }
              )
            ] })
          ] }, folder.id)) })
        ] })
      ] }),
      !isFullscreen && /* @__PURE__ */ jsxs("div", { className: `${mobileActivePane === "list" ? "flex" : "hidden md:flex"} w-full md:w-80 flex-1 md:flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-admin-surface flex-col`, children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => setMobileActivePane("folders"), className: "md:hidden flex items-center gap-1 -ml-2 text-[#c9952a] dark:text-[#ffca28] hover:opacity-70 transition-opacity px-2", children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px]", children: "Folders" })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-[17px] font-semibold text-gray-900 dark:text-admin-text hidden md:block", children: "Notes" })
          ] }),
          !isBin && /* @__PURE__ */ jsx("button", { onClick: createNote, className: "p-1.5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 rounded-md", children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "px-4 pb-3 border-b border-gray-200 dark:border-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Search team notes",
              className: "w-full pl-10 pr-3 py-1.5 bg-[#f4f5f5] dark:bg-gray-900 border-none rounded-md text-[13px] focus:ring-1 focus:ring-gray-300 transition-all placeholder:text-gray-400",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value)
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto", children: filteredNotes.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-gray-400 text-sm", children: "No notes found." }) : /* @__PURE__ */ jsx("div", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: filteredNotes.map((note, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setSelectedNote(note),
            className: `p-4 cursor-pointer transition-colors ${(selectedNote == null ? void 0 : selectedNote.id) === note.id ? "bg-[#FFC107] text-white" : "bg-white hover:bg-[#f4f5f5] dark:bg-admin-surface dark:hover:bg-admin-surface-muted"}`,
            children: [
              /* @__PURE__ */ jsx("h3", { className: `font-bold text-[14px] truncate mb-0.5 ${(selectedNote == null ? void 0 : selectedNote.id) === note.id ? "text-white" : "text-gray-900 dark:text-admin-text"}`, children: note.title || "Untitled Note" }),
              /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 text-[12px] ${(selectedNote == null ? void 0 : selectedNote.id) === note.id ? "text-yellow-100" : "text-gray-500"}`, children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium whitespace-nowrap", children: formatDate(note.updated_at) }),
                /* @__PURE__ */ jsx("span", { className: "truncate opacity-80", children: note.content ? note.content.replace(/<[^>]*>?/gm, "").substring(0, 30) : "No additional text" })
              ] })
            ]
          },
          note.id
        )) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: `${mobileActivePane === "editor" ? "flex" : "hidden md:flex"} flex-1 bg-white dark:bg-admin-bg flex-col w-full min-w-0`, children: selectedNote ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "h-16 px-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/50 shrink-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => {
              setSelectedNote(null);
              setMobileActivePane("list");
            }, className: "md:hidden flex items-center gap-1 -ml-2 text-[#c9952a] dark:text-[#ffca28] hover:opacity-70 transition-opacity px-2", children: [
              /* @__PURE__ */ jsx(ChevronLeft, { className: "w-5 h-5" }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-col items-start leading-tight", children: /* @__PURE__ */ jsx("span", { className: "text-[13px] font-semibold", children: currentFolderId ? ((_a = folders.find((f) => f.id == currentFolderId)) == null ? void 0 : _a.name) || "Folder" : "All Cloud Notes" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "hidden md:flex flex-col items-start ml-2 text-gray-400", children: /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-medium", children: [
              formatDate(selectedNote.updated_at),
              " at ",
              new Date(selectedNote.updated_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-gray-400", children: [
            /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-4 mr-2", children: [
              /* @__PURE__ */ jsx("button", { className: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsx(SquarePen, { className: "w-[18px] h-[18px]" }) }),
              /* @__PURE__ */ jsx("button", { className: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsx(Type, { className: "w-[18px] h-[18px]" }) }),
              /* @__PURE__ */ jsx("button", { className: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsx(ListTodo, { className: "w-[18px] h-[18px]" }) }),
              /* @__PURE__ */ jsx("button", { className: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsx(Table, { className: "w-[18px] h-[18px]" }) }),
              /* @__PURE__ */ jsx("button", { className: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors", children: /* @__PURE__ */ jsx(Paperclip, { className: "w-[18px] h-[18px]" }) })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setIsFullscreen(!isFullscreen), className: "hover:text-gray-700 dark:hover:text-gray-300 transition-colors hidden md:block", title: "Toggle Fullscreen", children: isFullscreen ? /* @__PURE__ */ jsx(Minimize2, { className: "w-[18px] h-[18px]" }) : /* @__PURE__ */ jsx(Maximize2, { className: "w-[18px] h-[18px]" }) }),
            isBin ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 ml-2 border-l border-gray-100 dark:border-gray-800 pl-4", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => restoreNote(selectedNote.id), className: "text-sm font-medium hover:text-green-600 transition-colors", title: "Restore", children: "Restore" }),
              /* @__PURE__ */ jsx("button", { onClick: () => deleteNote(selectedNote.id), className: "hover:text-red-600 transition-colors", title: "Delete Forever", children: /* @__PURE__ */ jsx(Trash2, { className: "w-[18px] h-[18px]" }) })
            ] }) : /* @__PURE__ */ jsx("button", { onClick: () => trashNote(selectedNote.id), className: "hover:text-red-500 transition-colors ml-2 border-l border-gray-100 dark:border-gray-800 pl-4", title: "Move to bin", children: /* @__PURE__ */ jsx(Trash2, { className: "w-[18px] h-[18px]" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto px-6 md:px-10 py-8 max-w-4xl w-full mx-auto", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: selectedNote.title || "",
              onChange: (e) => handleNoteChange("title", e.target.value),
              placeholder: "Title",
              className: "w-full text-3xl font-bold text-gray-900 dark:text-admin-text bg-transparent border-none focus:ring-0 p-0 mb-4 placeholder-gray-300 dark:placeholder-gray-600",
              readOnly: isBin
            }
          ),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: selectedNote.content || "",
              onChange: (e) => handleNoteChange("content", e.target.value),
              placeholder: "Start typing your note here...",
              className: "w-full h-full text-[15px] leading-relaxed text-gray-700 dark:text-admin-text bg-transparent border-none focus:ring-0 p-0 resize-none placeholder-gray-300 dark:placeholder-gray-600",
              readOnly: isBin
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-gray-300", children: [
        /* @__PURE__ */ jsx(FileText, { className: "w-16 h-16 mb-4 opacity-30" }),
        /* @__PURE__ */ jsx("p", { className: "text-[17px] font-semibold text-gray-400", children: "Select a note or create a new one" })
      ] }) })
    ] })
  ] });
}
export {
  NotesIndex as default
};
