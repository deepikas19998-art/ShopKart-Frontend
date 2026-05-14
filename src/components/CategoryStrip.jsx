import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'All',         emoji: '🏪' },
  { name: 'Electronics', emoji: '💻' },
  { name: 'Fashion',     emoji: '👗' },
  { name: 'Accessories', emoji: '⌚' },
  { name: 'Beauty',      emoji: '💄' },
  { name: 'Home',        emoji: '🏠' },
  { name: 'Gaming',      emoji: '🎮' },
  { name: 'Sports',      emoji: '⚽' },
];

const CategoryStrip = ({ active, onSelect }) => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    if (onSelect) {
      onSelect(name === 'All' ? '' : name);
    } else {
      navigate(`/products${name !== 'All' ? `?category=${name}` : ''}`);
    }
  };

  return (
    <div className="category-strip">
      <div className="category-inner">
        {categories.map((c) => (
          <button
            key={c.name}
            className={`cat-pill ${active === (c.name === 'All' ? '' : c.name) ? 'active' : ''}`}
            onClick={() => handleClick(c.name)}
          >
            <span className="cat-emoji">{c.emoji}</span>
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryStrip;