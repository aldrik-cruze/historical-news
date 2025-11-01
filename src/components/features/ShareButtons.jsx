import React from 'react';
import './ShareButtons.css';

export const ShareButtons = () => {
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = document.title;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="share-buttons">
      <button className="share-btn facebook" title="Share on Facebook" onClick={() => handleShare('facebook')}>
        <i className="fab fa-facebook-f"></i>
      </button>
      <button className="share-btn twitter" title="Share on Twitter" onClick={() => handleShare('twitter')}>
        <i className="fab fa-twitter"></i>
      </button>
      <button className="share-btn whatsapp" title="Share on WhatsApp" onClick={() => handleShare('whatsapp')}>
        <i className="fab fa-whatsapp"></i>
      </button>
      <button className="share-btn linkedin" title="Share on LinkedIn" onClick={() => window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href), '_blank', 'width=600,height=400')}>
        <i className="fab fa-linkedin-in"></i>
      </button>
    </div>
  );
};