'use client';

import { useState, useEffect, useRef } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, initiateAnonymousSignIn, useAuth } from '@/firebase';
import { collection, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function Chat() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // When the component loads, if the auth state is resolved and there's no user,
  // sign them in as an anonymous guest.
  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);


  const messagesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'chat_messages');
  }, [firestore]);

  // The query should only be created when we have a user, to avoid permission errors.
  const messagesQuery = useMemoFirebase(() => {
    if (!messagesRef || !user) return null;
    return query(messagesRef, orderBy('timestamp', 'asc'));
  }, [messagesRef, user]);

  const { data: messages, isLoading: isMessagesLoading } = useCollection(messagesQuery);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) {
        if (!user) {
            toast({ variant: 'destructive', title: 'Not authenticated. Please wait and try again.' });
        }
        return;
    }

    const messageData = {
      senderId: user.uid,
      displayName: user.isAnonymous ? 'Guest' : (user.displayName || 'User'),
      message: message,
      timestamp: serverTimestamp(),
    };

    if (messagesRef) {
      addDocumentNonBlocking(messagesRef, messageData);
      setMessage('');
    }
  };
  
  const isLoading = isUserLoading || (user && isMessagesLoading);

  return (
    <div className="flex flex-col h-[500px]">
      <ScrollArea className="flex-grow p-4 border rounded-t-lg" ref={scrollAreaRef}>
        <div className="space-y-4">
          {isLoading && <p className="text-center text-muted-foreground">Loading chat...</p>}
          {!isLoading && messages?.length === 0 && <p className="text-center text-muted-foreground">Be the first to send a message.</p>}
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                msg.senderId === user?.uid ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.senderId !== user?.uid && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{msg.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg px-4 py-2',
                  msg.senderId === user?.uid
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm font-medium">{msg.displayName}</p>
                <p className="text-sm">{msg.message}</p>
                 <p className="text-xs text-right opacity-70 mt-1">
                  {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex gap-2 p-4 border-t border-x border-b rounded-b-lg">
        <Input
          placeholder={user ? "Type your message..." : "Authenticating..."}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!user}
          className="flex-grow"
        />
        <Button type="submit" size="icon" disabled={!user || !message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
