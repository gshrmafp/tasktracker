import React from 'react';
import { useSelector } from 'react-redux';
import { FaShareAlt } from 'react-icons/fa';

const ShareTasks = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const [shareUrl, setShareUrl] = React.useState('');
  const [copied, setCopied] = React.useState(false);

  // Mock: encode tasks as base64 in URL fragment
  const handleShare = async () => {
    // Use a shortener API for a cleaner link
    const data = btoa(unescape(encodeURIComponent(JSON.stringify(tasks))));
    const longUrl = `${window.location.origin}${window.location.pathname}#share=${data}`;
    try {
      // Use tinyurl API for demonstration (no API key required)
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      const shortUrl = await res.text();
      setShareUrl(shortUrl);
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setShareUrl(longUrl);
      await navigator.clipboard.writeText(longUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Mock: detect and load shared tasks from URL
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#share=')) {
      try {
        const data = hash.replace('#share=', '');
        const imported = JSON.parse(decodeURIComponent(escape(atob(data))));
        if (Array.isArray(imported)) {
          window.dispatchEvent(new CustomEvent('import-shared-tasks', { detail: imported }));
        }
      } catch {}
    }
  }, []);

  return (
    <div className="flex gap-3 justify-end mb-3">
      <button onClick={handleShare} aria-label="Share tasks" title="Share tasks" className="bg-green-600 text-white rounded px-5 py-2 font-semibold hover:bg-green-700 transition shadow flex items-center gap-2">
        <FaShareAlt /> Share Task List
      </button>
      {shareUrl && (
        <span className="text-sm text-gray-800 bg-gray-100 rounded px-3 py-2 break-all shadow border border-gray-200">
          {copied ? 'Link copied!' : shareUrl}
        </span>
      )}
    </div>
  );
};

export default ShareTasks;