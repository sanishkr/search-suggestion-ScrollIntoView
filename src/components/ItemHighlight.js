import React from 'react';

export const ItemHighlight = ({ itemName, isCurrentItem, searchKey, className }) => {
  const reg = new RegExp(`(${searchKey})`, 'gi');
  const textParts = itemName.split(reg);
  if (!searchKey) {
    return (
      <span className={`${className} highlighted}`}>{itemName}</span>
    );
  }
  return (
    <span className={`${className} highlighted}`}>
      {textParts.map((part, i) =>
        part.match(reg) ? (
          <mark key={i+1} className="highlighted bg-transparent">{part}</mark>
        ) : (
          part
        )
      )}
    </span>
  );
};