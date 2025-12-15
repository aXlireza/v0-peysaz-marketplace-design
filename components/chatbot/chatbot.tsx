"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/i18n/context"
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  ImageIcon,
  ChevronDown,
  Bot,
  User,
  Package,
  Truck,
  CreditCard,
  HelpCircle,
  Phone,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "product" | "order"
  data?: any
}

const quickReplies = [
  { id: "track", icon: Truck, labelKey: "chatbot.track_order" },
  { id: "products", icon: Package, labelKey: "chatbot.browse_products" },
  { id: "cement", icon: Package, labelKey: "chatbot.cement_prices" },
  { id: "payment", icon: CreditCard, labelKey: "chatbot.payment_help" },
  { id: "support", icon: Phone, labelKey: "chatbot.speak_agent" },
]

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { t, locale, dir } = useLanguage()

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(t("chatbot.welcome"))
        setTimeout(() => {
          addBotMessage(t("chatbot.how_can_help"), "quick-reply")
        }, 800)
      }, 500)
    }
  }, [isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const addBotMessage = (content: string, type: Message["type"] = "text", data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
      type,
      data,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue
    addUserMessage(userMessage)
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with delay
    setTimeout(() => {
      handleBotResponse(userMessage.toLowerCase())
      setIsTyping(false)
    }, 1200)
  }

  const handleQuickReply = (id: string) => {
    const reply = quickReplies.find((r) => r.id === id)
    if (!reply) return

    addUserMessage(t(reply.labelKey))
    setIsTyping(true)

    setTimeout(() => {
      switch (id) {
        case "track":
          addBotMessage(t("chatbot.track_response"))
          break
        case "products":
          addBotMessage(t("chatbot.products_response"))
          break
        case "cement":
          addBotMessage(t("chatbot.cement_response"))
          break
        case "payment":
          addBotMessage(t("chatbot.payment_response"))
          break
        case "support":
          addBotMessage(t("chatbot.support_response"))
          break
      }
      setIsTyping(false)
    }, 1000)
  }

  const handleBotResponse = (userInput: string) => {
    // Simple keyword-based responses (in production, use AI API)
    if (userInput.includes("track") || userInput.includes("order") || userInput.includes("پیگیری")) {
      addBotMessage(t("chatbot.track_response"))
    } else if (
      userInput.includes("price") ||
      userInput.includes("قیمت") ||
      userInput.includes("cement") ||
      userInput.includes("سیمان")
    ) {
      addBotMessage(t("chatbot.cement_response"))
    } else if (userInput.includes("product") || userInput.includes("محصول")) {
      addBotMessage(t("chatbot.products_response"))
    } else if (userInput.includes("payment") || userInput.includes("پرداخت")) {
      addBotMessage(t("chatbot.payment_response"))
    } else if (userInput.includes("hello") || userInput.includes("hi") || userInput.includes("سلام")) {
      addBotMessage(t("chatbot.greeting"))
    } else if (userInput.includes("help") || userInput.includes("کمک")) {
      addBotMessage(t("chatbot.help_response"))
    } else {
      addBotMessage(t("chatbot.default_response"))
      setTimeout(() => {
        addBotMessage(t("chatbot.ask_help"))
      }, 800)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        size="lg"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 z-50 h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 hover:scale-110 transition-all"
        style={{ [dir === "rtl" ? "left" : "right"]: "1.5rem" }}
        aria-label={t("chatbot.open")}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent animate-pulse" />
      </Button>
    )
  }

  return (
    <Card
      className="fixed bottom-6 z-50 flex flex-col shadow-2xl border-2 transition-all"
      style={{
        [dir === "rtl" ? "left" : "right"]: "1.5rem",
        width: "min(400px, calc(100vw - 3rem))",
        height: isMinimized ? "60px" : "min(600px, calc(100vh - 8rem))",
      }}
      dir={dir}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary-foreground/20">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{t("chatbot.assistant")}</h3>
            <p className="text-xs opacity-90 flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
              {t("chatbot.online")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isMinimized ? "rotate-180" : ""}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chat Area */}
      {!isMinimized && (
        <>
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString(
                        locale === "fa" ? "fa-IR" : locale === "zh" ? "zh-CN" : "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </span>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-accent/10 text-accent">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {/* Quick Replies */}
              {messages.length > 0 &&
                messages[messages.length - 1].type === "quick-reply" &&
                messages[messages.length - 1].sender === "bot" && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {quickReplies.map((reply) => (
                      <Button
                        key={reply.id}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickReply(reply.id)}
                        className="gap-2 text-xs"
                      >
                        <reply.icon className="h-3 w-3" />
                        {t(reply.labelKey)}
                      </Button>
                    ))}
                  </div>
                )}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 items-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3 flex gap-1">
                    <span
                      className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4 space-y-3">
            {/* Suggested Actions */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground">
                <HelpCircle className="h-3 w-3 mr-1" />
                {t("chatbot.faq")}
              </Badge>
              <Badge variant="outline" className="text-xs cursor-pointer hover:bg-accent hover:text-accent-foreground">
                <Phone className="h-3 w-3 mr-1" />
                {t("chatbot.call_support")}
              </Badge>
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t("chatbot.type_message")}
                  className="pr-20"
                  dir={dir}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 flex gap-1"
                  style={{ [dir === "rtl" ? "left" : "right"]: "0.5rem" }}
                >
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim()} className="flex-shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Footer Info */}
            <p className="text-xs text-muted-foreground text-center">{t("chatbot.powered_by")}</p>
          </div>
        </>
      )}
    </Card>
  )
}
