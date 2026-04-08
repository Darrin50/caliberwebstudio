'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  date: string;
  hasReply: boolean;
  replied?: boolean;
  source?: string;
}

interface ReviewsData {
  averageRating: number;
  totalReviews: number;
  reviewsThisMonth: number;
  responseRate: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

const colors = {
  bg: '#0a0a0e',
  blue: '#2563eb',
  navy: '#1E3D8F',
  border: 'rgba(255,255,255,0.08)',
  text: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.6)',
  textTertiary: 'rgba(255,255,255,0.4)',
  gold: '#fbbf24',
  green: '#10b981',
  red: '#ef4444',
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? colors.gold : 'none'}
    stroke={filled ? colors.gold : colors.border}
    strokeWidth="2"
    style={{ display: 'inline-block', marginRight: 4 }}
  >
    <polygon points="12 2 15.09 10.26 24 10.35 17.77 16.88 20.16 25.08 12 19.77 3.84 25.08 6.23 16.88 0 10.35 8.91 10.26 12 2" />
  </svg>
);

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <StarIcon key={star} filled={star <= rating} />
    ))}
  </div>
);

const RatingBar = ({
  stars,
  count,
  total,
}: {
  stars: number;
  count: number;
  total: number;
}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ width: 40, textAlign: 'right', fontSize: 14, color: colors.textSecondary }}>
        {stars}★
      </div>
      <div
        style={{
          flex: 1,
          height: 8,
          backgroundColor: colors.border,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: colors.blue,
            width: `${percentage}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <div
        style={{
          width: 40,
          textAlign: 'left',
          fontSize: 14,
          color: colors.textSecondary,
        }}
      >
        {count}
      </div>
    </div>
  );
};

const SummaryCard = ({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string | number;
  subtext?: string;
}) => (
  <div
    style={{
      padding: 20,
      backgroundColor: 'rgba(255,255,255,0.02)',
      border: `1px solid ${colors.border}`,
      borderRadius: 12,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    }}
  >
    <div style={{ color: colors.textSecondary, fontSize: 13, marginBottom: 12 }}>
      {label}
    </div>
    <div style={{ fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 4 }}>
      {value}
    </div>
    {subtext && (
      <div style={{ fontSize: 12, color: colors.textTertiary }}>
        {subtext}
      </div>
    )}
  </div>
);

interface ReviewsClientProps {
  slug: string;
  plan: string;
}

export default function ReviewsClient({ slug, plan }: ReviewsClientProps) {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'unreplied'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/portal/reviews?slug=${slug}`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [slug]);

  const getFilteredReviews = () => {
    if (!data) return [];
    return data.reviews.filter((review) => {
      if (filter === 'positive') return review.rating >= 4;
      if (filter === 'negative') return review.rating <= 2;
      if (filter === 'unreplied') return !review.replied;
      return true;
    });
  };

  const handleReplySubmit = async (reviewId: string) => {
    if (!replyText.trim()) return;
    try {
      setSubmittingReply(true);
      const response = await fetch(`/api/portal/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyText, slug }),
      });
      if (!response.ok) throw new Error('Failed to submit reply');
      setReplyingTo(null);
      setReplyText('');
      // Refetch reviews
      const reviewsResponse = await fetch(`/api/portal/reviews?slug=${slug}`);
      const result = await reviewsResponse.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit reply');
    } finally {
      setSubmittingReply(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 24px', color: colors.textSecondary }}>
        Loading reviews...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ padding: '40px 24px', color: colors.red }}>
        {error || 'Failed to load reviews'}
      </div>
    );
  }

  const filteredReviews = getFilteredReviews();

  return (
    <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <h1
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: colors.text,
          marginBottom: 32,
          fontFamily: 'Syne, sans-serif',
        }}
      >
        Reviews
      </h1>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        <SummaryCard
          label="Average Rating"
          value={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{data.averageRating.toFixed(1)}</span>
              <StarIcon filled />
            </div>
          }
          subtext={`Based on ${data.totalReviews} reviews`}
        />
        <SummaryCard label="Total Reviews" value={data.totalReviews} />
        <SummaryCard label="This Month" value={data.reviewsThisMonth} />
        <SummaryCard
          label="Response Rate"
          value={`${data.responseRate}%`}
          subtext="Of unreplied reviews"
        />
      </div>

      {/* Rating Distribution */}
      <div
        style={{
          padding: 24,
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          marginBottom: 40,
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, color: colors.text }}>
          Rating Distribution
        </h2>
        <RatingBar stars={5} count={data.ratingDistribution[5]} total={data.totalReviews} />
        <RatingBar stars={4} count={data.ratingDistribution[4]} total={data.totalReviews} />
        <RatingBar stars={3} count={data.ratingDistribution[3]} total={data.totalReviews} />
        <RatingBar stars={2} count={data.ratingDistribution[2]} total={data.totalReviews} />
        <RatingBar stars={1} count={data.ratingDistribution[1]} total={data.totalReviews} />
      </div>

      {/* Filters */}
      <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['all', 'positive', 'negative', 'unreplied'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === f ? colors.blue : 'transparent',
              border: `1px solid ${filter === f ? colors.blue : colors.border}`,
              color: colors.text,
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredReviews.length === 0 ? (
          <div style={{ color: colors.textSecondary, padding: 20 }}>
            No reviews match this filter.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              style={{
                padding: 20,
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ marginBottom: 8 }}>
                    <StarRating rating={review.rating} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>
                    {review.authorName}
                  </div>
                  <div style={{ fontSize: 12, color: colors.textSecondary }}>
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <div
                  style={{
                    padding: '6px 12px',
                    backgroundColor: review.replied ? colors.green : colors.blue,
                    borderRadius: 4,
                    fontSize: 11,
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  {review.replied ? 'Replied' : 'Unreplied'}
                </div>
              </div>

              <p
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}
              >
                {review.text}
              </p>

              {expandedId === review.id && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${colors.border}` }}>
                  {plan !== 'basic' && !review.replied && (
                    <>
                      {replyingTo === review.id ? (
                        <div style={{ marginBottom: 12 }}>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            style={{
                              width: '100%',
                              padding: 12,
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              border: `1px solid ${colors.border}`,
                              borderRadius: 6,
                              color: colors.text,
                              fontFamily: 'Inter, sans-serif',
                              fontSize: 14,
                              marginBottom: 12,
                              minHeight: 80,
                              resize: 'vertical',
                            }}
                          />
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              onClick={() => handleReplySubmit(review.id)}
                              disabled={submittingReply}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: colors.blue,
                                color: colors.text,
                                border: 'none',
                                borderRadius: 6,
                                cursor: submittingReply ? 'not-allowed' : 'pointer',
                                fontSize: 12,
                                fontWeight: 600,
                                opacity: submittingReply ? 0.6 : 1,
                              }}
                            >
                              {submittingReply ? 'Submitting...' : 'Submit Reply'}
                            </button>
                            <button
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyText('');
                              }}
                              style={{
                                padding: '8px 16px',
                                backgroundColor: 'transparent',
                                color: colors.textSecondary,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 6,
                                cursor: 'pointer',
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setReplyingTo(review.id)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: colors.navy,
                            color: colors.text,
                            border: 'none',
                            borderRadius: 6,
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          Reply to Review
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}

              <button
                onClick={() =>
                  setExpandedId(expandedId === review.id ? null : review.id)
                }
                style={{
                  marginTop: 12,
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  color: colors.blue,
                  border: `1px solid ${colors.blue}`,
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {expandedId === review.id ? 'Collapse' : 'Expand'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
