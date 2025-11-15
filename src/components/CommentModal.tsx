/**
 * CommentModal Component
 * 상점 코멘트 모달
 */

import { getCommentsByShopId, getCommentCount } from '../data/mockComments'
import './CommentModal.css'

interface CommentModalProps {
  shopId: string
  shopName: string
  onClose: () => void
}

export default function CommentModal({ shopId, shopName, onClose }: CommentModalProps) {
  const comments = getCommentsByShopId(shopId)
  const totalCount = getCommentCount(shopId)

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="comment-modal-header">
          <div>
            <h3>{shopName}</h3>
            <span className="comment-count">{totalCount} comments</span>
          </div>
          <button className="comment-close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 코멘트 리스트 */}
        <div className="comment-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div
                className="comment-avatar"
                style={{ backgroundColor: comment.userAvatar }}
              >
                {comment.userName.charAt(0)}
              </div>
              <div className="comment-content">
                <div className="comment-header-info">
                  <span className="comment-username">{comment.userName}</span>
                  <span className="comment-timestamp">{comment.timestamp}</span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 코멘트 입력창 */}
        <div className="comment-input-container">
          <div className="comment-input-avatar" style={{ backgroundColor: '#FF6B6B' }}>
            U
          </div>
          <input
            type="text"
            className="comment-input"
            placeholder="Write a comment..."
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
