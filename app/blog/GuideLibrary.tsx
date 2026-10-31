"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { GuideCard, type GuideSummary } from "./GuideCard";

export function GuideLibrary({ guides, topics }: {
  guides: GuideSummary[];
  topics: { slug: string; name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = guides.filter(guide => {
    const text = `${guide.title} ${guide.description} ${guide.topicName}`.toLowerCase();
    return (topic === "all" || guide.topic === topic) && words.every(word => text.includes(word));
  });

  return (
    <div id="guide-library" className="guide-library">
      <div className="guide-library-toolbar">
        <div className="guide-topic-filters" role="group" aria-label="Filter guides by topic">
          {[{ slug: "all", name: "All guides" }, ...topics].map(item => (
            <button key={item.slug} type="button" aria-pressed={topic === item.slug} onClick={() => setTopic(item.slug)}>{item.name}</button>
          ))}
        </div>
        <label className="guide-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search guide titles and descriptions</span>
          <input type="search" placeholder="Find a guide" value={query} onChange={event => setQuery(event.target.value)} />
        </label>
      </div>
      <p className="guide-results" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "guide" : "guides"}{query.trim() ? ` matching “${query.trim()}”` : " to help you plan"}</p>
      <div className="guide-card-grid">
        {visible.map(guide => <GuideCard key={guide.slug} guide={guide} />)}
      </div>
      {!visible.length && <div className="guide-empty"><h3>No guide matches that search yet.</h3><p>Try a broader phrase, or tell us your question through the contact page.</p><button type="button" onClick={() => { setQuery(""); setTopic("all"); }}>Clear filters <X size={16} /></button></div>}
    </div>
  );
}
