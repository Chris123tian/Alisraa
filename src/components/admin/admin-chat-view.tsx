'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase, deleteDocumentNonBlocking, addDocumentNonBlocking, useUser } from '@/firebase';
import { collection, query, orderBy, doc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Trash2, Send, MessageSquare, ShieldAlert, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/hooks/useAdmin';
import { cn } from '@/lib/utils';

export function AdminChatView() {
  const { user: adminUser } = useUser();
  const firestore = useFirestore();
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const [reply, setReply] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const messagesRef = useMemoFirebase(() => {
    if (!firestore || isAdminLoading || !isAdmin) return null;
    return collection(firestore, 'chat_messages');
  }, [firestore, isAdmin, isAdminLoading]);
  
  const messagesQuery = useMemoFirebase(() => {
    if (!messagesRef) return null;
    return query(messagesRef, orderBy('timestamp', 'asc'));
  }, [messagesRef]);

  const { data: allMessages, isLoading } = useCollection(messagesQuery);

  // Group messages by clientId to identify unique conversations
  const conversations = useMemo(() => {
    if (!allMessages) return [];
    const groups: Record<string, { clientId: string, displayName: string, lastMessage: string, timestamp: any }> = {};
    
    allMessages.forEach(msg => {
      // If the sender isn't the admin, they are a client
      if (msg.senderId !== adminUser?.uid) {
        if (!groups[msg.clientId]) {
          groups[msg.clientId] = {
            clientId: msg.clientId,
            displayName: msg.displayName || 'Guest',
            lastMessage: msg.message,
            timestamp: msg.timestamp
          };
        } else {
          // Update last message/timestamp for sorting
          groups[msg.clientId].lastMessage = msg.message;
          groups[msg.clientId].timestamp = msg.timestamp;
        }
      }
    });
    
    return Object.values(groups).sort((a, b) => {
      const timeA = a.timestamp?.toMillis?.() || 0;
      const timeB = b.timestamp?.toMillis?.() || 0;
      return timeB - timeA;
    });
  }, [allMessages, adminUser]);

  // If no client is selected, select the first one automatically when data loads
  useEffect(() => {
    if (!selectedClientId && conversations.length > 0) {
      setSelectedClientId(conversations[0].clientId);
    }
  }, [conversations, selectedClientId]);

  const filteredMessages = useMemo(() => {
    if (!allMessages || !selectedClientId) return [];
    return allMessages.filter(msg => msg.clientId === selectedClientId);
  }, [allMessages, selectedClientId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            setTimeout(() => {
              viewport.scrollTop = viewport.scrollHeight;
            }, 100);
        }
    }
  }, [filteredMessages]);

  const handleDeleteMessage = (messageId: string) => {
    if (!firestore || !isAdmin) return;
    const messageDocRef = doc(firestore, 'chat_messages', messageId);
    deleteDocumentNonBlocking(messageDocRef);
  };

  const handleSendReply = () => {
    if (!reply.trim() || !firestore || !adminUser || !messagesRef || !isAdmin || !selectedClientId) return;

    const messageData = {
      senderId: adminUser.uid,
      clientId: selectedClientId, // Critical: Map reply to the specific client
      displayName: 'Support Agent (Admin)',
      message: reply,
      timestamp: serverTimestamp(),
    };

    addDocumentNonBlocking(messagesRef, messageData);
    setReply('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
      {/* Conversations Sidebar */}
      <Card className="lg:col-span-1 border-none shadow-xl overflow-hidden rounded-[2rem] flex flex-col bg-muted/30">
        <CardHeader className="bg-primary/5 p-6 border-b">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
            <User className="w-4 h-4" />
            Clients
          </CardTitle>
        </CardHeader>
        <ScrollArea className="flex-grow">
          <div className="p-2 space-y-1">
            {conversations.length === 0 && !isLoading && (
              <p className="text-center text-[10px] py-10 text-muted-foreground uppercase font-bold tracking-widest">No active chats</p>
            )}
            {conversations.map((conv) => (
              <button
                key={conv.clientId}
                onClick={() => setSelectedClientId(conv.clientId)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl transition-all group",
                  selectedClientId === conv.clientId 
                    ? "bg-primary text-white shadow-lg" 
                    : "hover:bg-white/50 text-foreground"
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-black uppercase tracking-tight truncate">{conv.displayName}</p>
                </div>
                <p className={cn(
                  "text-[10px] truncate opacity-60",
                  selectedClientId === conv.clientId ? "text-accent" : "text-muted-foreground"
                )}>
                  {conv.lastMessage}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Window */}
      <Card className="lg:col-span-3 flex flex-col h-full border-none shadow-2xl overflow-hidden rounded-[2rem]">
        <CardHeader className="bg-primary text-white p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3 text-xl md:text-2xl font-black uppercase tracking-tight">
                <MessageSquare className="w-5 h-5 text-accent" />
                {selectedClientId ? (conversations.find(c => c.clientId === selectedClientId)?.displayName || 'Direct Thread') : 'Support Console'}
              </CardTitle>
              <CardDescription className="text-primary-foreground/70 text-xs md:text-sm">
                Real-time communication manifest.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0 bg-white min-h-0">
          <ScrollArea className="flex-grow p-6 md:p-8" ref={scrollAreaRef}>
            <div className="space-y-6">
              {(isLoading || isAdminLoading) && (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Syncing manifest...</p>
                </div>
              )}
              {!isLoading && !isAdminLoading && filteredMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 opacity-20">
                  <ShieldAlert className="w-12 h-12 mb-4" />
                  <p className="text-center font-black uppercase tracking-widest text-xs">Select a client conversation.</p>
                </div>
              )}
              {filteredMessages.map((msg) => (
                <div key={msg.id} className={`flex flex-col group ${msg.senderId === adminUser?.uid ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-4 md:p-5 shadow-sm relative transition-all hover:shadow-lg ${
                    msg.senderId === adminUser?.uid ? 'bg-primary text-white rounded-tr-none' : 'bg-muted/50 text-foreground rounded-tl-none border border-black/5'
                  }`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest opacity-60 mb-2 ${
                      msg.senderId === adminUser?.uid ? 'text-accent' : 'text-primary'
                    }`}>
                      {msg.displayName}
                    </p>
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex items-center justify-between mt-3 gap-6">
                      <p className="text-[9px] opacity-40 font-mono">
                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                      </p>
                      <button 
                        onClick={() => handleDeleteMessage(msg.id)} 
                        className="opacity-0 group-hover:opacity-100 text-destructive/60 hover:text-destructive hover:scale-125 transition-all p-1"
                        title="Delete Message"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 md:p-6 bg-muted/20 border-t">
            <div className="flex gap-3 md:gap-4 max-w-5xl mx-auto items-end">
              <Textarea 
                placeholder="Type your response... (Enter for new line)" 
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="bg-white border-primary/10 min-h-[48px] max-h-[150px] text-sm md:text-base rounded-xl shadow-inner focus:ring-accent resize-none py-3"
              />
              <Button 
                onClick={handleSendReply}
                className="h-12 md:h-14 bg-accent hover:bg-accent/90 px-6 md:px-8 rounded-xl shadow-xl transition-transform hover:scale-105 shrink-0" 
                disabled={!reply.trim() || !isAdmin || !selectedClientId}
              >
                <Send className="w-4 h-4 md:w-5 md:h-5 md:mr-2" />
                <span className="hidden md:inline font-bold uppercase tracking-widest text-[10px]">Send Reply</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
