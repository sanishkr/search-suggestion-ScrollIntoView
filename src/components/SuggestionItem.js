import React from 'react';
import { ItemHighlight } from './ItemHighlight';

export default ({ id, name, items, address, pincode, query, index, hovercb, isHovered = false, isKb=false }) => {
  const liRef = React.useRef(null);
  React.useEffect(() => {
    if (isKb && isHovered && liRef.current) {
      // fieldRef.current.scrollIntoView();
      liRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isKb, isHovered]);
  return (
    <li ref={liRef} className={`suggestion-item ${isHovered ? 'hovered' : ''}`} onMouseOver={() => hovercb(index)} onMouseOut={() => hovercb(-1)}>
      <ItemHighlight className="id" itemName={id} searchKey={query} />
      <ItemHighlight className="name" itemName={name} searchKey={query} />
      {
        query && JSON.stringify(items).toLowerCase().includes(query.toLowerCase()) ?
          <span className="items">
            <span className="items-middot">&middot;</span>
            {`"${query}" found in items`}
          </span>
          : null
      }
      <ItemHighlight className="address" itemName={address} searchKey={query} />
    </li>
  )
}