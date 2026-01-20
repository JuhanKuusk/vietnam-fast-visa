"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface EmailMessage {
  id: string;
  uid: number;
  subject: string;
  from: {
    name: string;
    address: string;
  };
  to: {
    name: string;
    address: string;
  }[];
  date: string;
  preview: string;
  body?: string;
  htmlBody?: string;
  isRead: boolean;
  hasAttachments: boolean;
}

export default function AdminInboxPage() {
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [showCompose, setShowCompose] = useState(false);
  const [replyTo, setReplyTo] = useState<EmailMessage | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sending, setSending] = useState(false);

  // Compose form state
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");

  const lastCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio for notifications
  useEffect(() => {
    // Create audio element for notification sound
    audioRef.current = new Audio("/sounds/notification.wav");
    audioRef.current.volume = 0.5;

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Load sound preference from localStorage
    const savedSoundPref = localStorage.getItem("inbox_sound_enabled");
    if (savedSoundPref !== null) {
      setSoundEnabled(savedSoundPref === "true");
    }
  }, []);

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, ignore
      });
    }
  }, [soundEnabled]);

  // Show browser notification
  const showNotification = useCallback((title: string, body: string) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico",
        tag: "new-email",
      });
    }
  }, []);

  // Fetch emails
  const fetchEmails = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/inbox?limit=50");
      if (response.ok) {
        const data = await response.json();
        setEmails(data.emails || []);
        setUnreadCount(data.unread || 0);
        setTotalCount(data.total || 0);
        lastCountRef.current = data.total || 0;
      }
    } catch (error) {
      console.error("Failed to fetch emails:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Check for new emails (polling)
  const checkNewEmails = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/inbox?checkOnly=true&lastCount=${lastCountRef.current}`);
      if (response.ok) {
        const data = await response.json();

        if (data.hasNew && data.newCount > 0) {
          // New email(s) arrived!
          playNotificationSound();
          showNotification(
            "New Email",
            `You have ${data.newCount} new email${data.newCount > 1 ? "s" : ""}`
          );

          // Refresh the email list
          await fetchEmails();
        }

        setUnreadCount(data.unreadCount);
        lastCountRef.current = data.totalCount;
      }
    } catch (error) {
      console.error("Failed to check emails:", error);
    }
  }, [fetchEmails, playNotificationSound, showNotification]);

  // Initial fetch
  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  // Poll for new emails every 30 seconds
  useEffect(() => {
    const interval = setInterval(checkNewEmails, 30000);
    return () => clearInterval(interval);
  }, [checkNewEmails]);

  // Toggle sound preference
  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem("inbox_sound_enabled", String(newValue));
  };

  // Fetch single email
  const openEmail = async (email: EmailMessage) => {
    setLoadingEmail(true);
    try {
      const response = await fetch(`/api/admin/inbox/${email.uid}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedEmail(data.email);

        // Update local state to mark as read
        setEmails(prev => prev.map(e =>
          e.uid === email.uid ? { ...e, isRead: true } : e
        ));
        if (!email.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error("Failed to fetch email:", error);
    } finally {
      setLoadingEmail(false);
    }
  };

  // Handle reply
  const handleReply = (email: EmailMessage) => {
    setReplyTo(email);
    setComposeTo(email.from.address);
    setComposeSubject(email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`);
    setComposeBody(`\n\n---\nOn ${new Date(email.date).toLocaleString()}, ${email.from.name || email.from.address} wrote:\n\n${email.body || email.preview}`);
    setShowCompose(true);
  };

  // Handle compose new
  const handleCompose = () => {
    setReplyTo(null);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
    setShowCompose(true);
  };

  // Send email
  const handleSend = async () => {
    if (!composeTo || !composeSubject) {
      alert("Please fill in To and Subject fields");
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/admin/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: composeTo,
          subject: composeSubject,
          text: composeBody,
          html: `<pre style="font-family: sans-serif; white-space: pre-wrap;">${composeBody}</pre>`,
        }),
      });

      if (response.ok) {
        setShowCompose(false);
        setComposeTo("");
        setComposeSubject("");
        setComposeBody("");
        setReplyTo(null);
        alert("Email sent successfully!");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Send error:", error);
      alert("Failed to send email");
    } finally {
      setSending(false);
    }
  };

  // Delete email
  const handleDelete = async (uid: number) => {
    if (!confirm("Are you sure you want to delete this email?")) return;

    try {
      const response = await fetch(`/api/admin/inbox/${uid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEmails(prev => prev.filter(e => e.uid !== uid));
        if (selectedEmail?.uid === uid) {
          setSelectedEmail(null);
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"} · {totalCount} total
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sound toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg ${soundEnabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
            title={soundEnabled ? "Sound enabled" : "Sound disabled"}
          >
            {soundEnabled ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>

          {/* Refresh */}
          <button
            onClick={fetchEmails}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
            title="Refresh"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {/* Compose */}
          <button
            onClick={handleCompose}
            className="px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2"
            style={{ backgroundColor: "#ef7175" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Compose
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100%-5rem)] flex overflow-hidden">
        {/* Email list */}
        <div className={`${selectedEmail ? "w-1/3 border-r border-gray-200" : "w-full"} overflow-y-auto`}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          ) : emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p>No emails yet</p>
            </div>
          ) : (
            emails.map((email) => (
              <div
                key={email.uid}
                onClick={() => openEmail(email)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedEmail?.uid === email.uid ? "bg-pink-50" : ""
                } ${!email.isRead ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {/* Unread indicator */}
                  <div className={`w-2 h-2 rounded-full mt-2 ${!email.isRead ? "bg-blue-500" : "bg-transparent"}`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm truncate ${!email.isRead ? "font-semibold text-gray-900" : "text-gray-700"}`}>
                        {email.from.name || email.from.address}
                      </span>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatDate(email.date)}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${!email.isRead ? "font-medium text-gray-900" : "text-gray-600"}`}>
                      {email.subject || "(No Subject)"}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {email.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Email detail */}
        {selectedEmail && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {loadingEmail ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Email header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedEmail.subject}</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReply(selectedEmail)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        title="Reply"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(selectedEmail.uid)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                        title="Delete"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                        title="Close"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                      {(selectedEmail.from.name || selectedEmail.from.address).charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {selectedEmail.from.name || selectedEmail.from.address}
                      </p>
                      <p className="text-gray-500">{selectedEmail.from.address}</p>
                    </div>
                    <div className="ml-auto text-gray-500">
                      {new Date(selectedEmail.date).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Email body */}
                <div className="flex-1 overflow-y-auto p-6">
                  {selectedEmail.htmlBody ? (
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedEmail.htmlBody }}
                    />
                  ) : (
                    <pre className="whitespace-pre-wrap font-sans text-gray-700">
                      {selectedEmail.body || selectedEmail.preview}
                    </pre>
                  )}
                </div>

                {/* Quick reply */}
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => handleReply(selectedEmail)}
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                    Reply to this email
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {replyTo ? "Reply" : "New Message"}
              </h3>
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="email"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  placeholder="recipient@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none"
                  placeholder="Write your message..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending}
                className="px-6 py-2 rounded-lg text-white font-medium disabled:opacity-50 flex items-center gap-2"
                style={{ backgroundColor: "#ef7175" }}
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
