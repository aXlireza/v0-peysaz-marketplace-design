"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  verified: boolean
}

interface ReviewsSectionProps {
  rating: number
  totalReviews: number
  distribution: { stars: number; count: number; percentage: number }[]
  reviews: Review[]
}

export function ReviewsSection({ rating, totalReviews, distribution, reviews }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Customer Reviews</span>
          <Button variant="outline" size="sm">
            Write a Review
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Rating Summary */}
        <div className="flex flex-col md:flex-row gap-8 pb-6 border-b border-border">
          <div className="text-center">
            <div className="text-5xl font-bold">{rating}</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= Math.round(rating) ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Based on {totalReviews} reviews</div>
          </div>
          <div className="flex-1 space-y-2">
            {distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm w-16">{item.stars} stars</span>
                <Progress value={item.percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-12">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6 mt-6">
          {displayedReviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">Verified Purchase</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            star <= review.rating ? "fill-amber-500 text-amber-500" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <h4 className="font-medium mt-2">{review.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{review.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="gap-2 h-8">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 h-8">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length > 3 && (
          <Button variant="outline" className="w-full mt-6 bg-transparent" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
